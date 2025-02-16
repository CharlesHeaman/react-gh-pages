import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FormWizardFlex, { FormStep } from "../../../components/form/FormWizardFlex";
import OuterContainer from "../../../components/ui/Containers/OuterContainer/OuterContainer";
import { CustomerCollectionResponse, CustomerResponseData } from "../../../types/customers.types";
import { DepartmentCollectionResponse, DepartmentResponseData } from "../../../types/department.types";
import { EquipmentCollectionResponse, EquipmentResponseData } from "../../../types/equipment.types";
import { SiteCollectionResponse, SiteResponseData } from "../../../types/sites.types";
import { TicketCollectionResponse, TicketResponseData } from "../../../types/tickets.types";
import { TimegridCollectionResponse, TimegridResponseData } from "../../../types/timegrid.types";
import { TimegridTicketTimeCollectionResponse, TimegridTicketTimeResponseData } from "../../../types/timegridTicketTime.types";
import { UserCollectionResponse, UserResponseData } from "../../../types/user.types";
import findTicket from "../../../utils/findTicket";
import getAPI from "../../../utils/getAPI";
import putAPI from "../../../utils/putAPI";
import getTimegridCode from "../utils/getTimegridCode";
import DistributeTicketTimeSkeleton from "./components/DistributeTicketTime/components/DistributeInvoiceTicketTimeSkeleton";
import DistributeTicketTime from "./components/DistributeTicketTime/DistributeTicketTime";
import TicketDataSummary from "./components/SubmitData/components/TicketDataSummary/TicketDataSummary";
import getInvoiceTicketTime from "./components/SubmitData/components/TicketDataSummary/utils/getInvoiceTicketTime";

export interface ProcessTicket {
    ticket_id: number,
    ticket_type: number,
    report: string,
    sundries: Array<ProcessSundry>,
    visit_date: Date,
    completion_date: string,
    is_further_work_required: boolean,
    is_ready_for_invoicing: boolean
}

export interface ProcessSundry {
    product_id: number,
    quantity: number
}

export interface InvoiceTicketTime {
    ticket_id: number,
    ticket_type: number,
    on_site_time: number,
    travel_time: number,
    mileage: number,
    expenses: number,
    is_mate_rate: boolean
}

const ProcessTimegridPage = () => {
    const { userCode, date } = useParams();
    const navigate = useNavigate();

    const timegridDate = new Date(date as string);

    const [isProcessing, setIsProcessing] = useState(false);
    const [maxStepSubmitted, setMaxStepSubmitted] = useState(0);
    const [isTimegridLoading, setIsTimegridLoading] = useState(true);
    const [isUserLoading, setIsUserLoading] = useState(true);
    const [isTicketsLoading, setIsTicketsLoading] = useState(true);
    const [isCustomerLoading, setIsCustomerLoading] = useState(true);
    const [isSiteLoading, setIsSiteLoading] = useState(true);
    const [isEquipmentLoading, setIsEquipmentLoading] = useState(true);
    const [isDepartmentsLoading, setIsDepartmentsLoading] = useState(true);
    const [isTimegridTicketTimeLoading, setIsTimegridTicketTimeLoading] = useState(true);
    const [currentTicketIndex, setCurrentTicketIndex] = useState(0)
    const [timegridData, setTimegridData] = useState<TimegridResponseData>();
    const [userData, setUserData] = useState<UserResponseData>();
    const [ticketData, setTicketData] = useState<Array<TicketResponseData>>([]);
    const [siteData, setSiteData] = useState<Array<SiteResponseData>>([]);
    const [customerData, setCustomerData] = useState<Array<CustomerResponseData>>([]);
    const [equipmentData, setEquipmentData] = useState<Array<EquipmentResponseData>>([]);
    const [departmentData, setDepartmentData] = useState<Array<DepartmentResponseData>>([]);
    const [timegridTicketTimeData, setTimegridTicketTimeData] = useState<Array<TimegridTicketTimeResponseData>>([]);
    const [processTicketData, setProcessTicketData] = useState<Array<ProcessTicket>>([]);
    const [invoiceTicketTimeData, setInvoiceTicketTimeData] = useState<Array<InvoiceTicketTime>>([]);
    const [isEngineerDepartmentLoading, setIsEngineerDepartmentLoading] = useState(true);
    const [engineerDepartment, setEngineerDepartment] = useState<DepartmentResponseData>();

    useEffect(() => {
        getUserData(userCode as string);
    }, [userCode])

    useEffect(() => {
        if (userData?.id === undefined) return;
        getTimegridData(userData.id);
    }, [userData, date]);

    const getUserData = (userCode: string) => {
        getAPI('users', {
            is_active: true,
            user_code: userCode
        }, (response: any) => {
            const userData: UserCollectionResponse = response.data;
            const currentUser = userData.data[0];
            setUserData(currentUser);
            getEngineerDepartment(currentUser.data.department_id);
        }, setIsUserLoading);
    }

    const getEngineerDepartment = (departmentID: number) => {
        getAPI(`departments/${departmentID}`, {}, (response: any) => {
            const departmentData: DepartmentResponseData = response.data;
            setEngineerDepartment(departmentData);
        }, setIsEngineerDepartmentLoading);
    }

    const getTimegridData = (userID: number) => {
        getAPI('timegrids', {
            date: timegridDate,
            user_ids: [userID]
        }, (response: any) => {
            const timegridData: TimegridCollectionResponse = response.data;
            const currentTimeGridData = timegridData.data[0];
            setTimegridData(currentTimeGridData);
            getTicketData(currentTimeGridData.data.user_id, currentTimeGridData.data.date)
        }, setIsTimegridLoading)
    }

    const getTicketData = (userID: number, date: Date) => {
        getAPI('tickets', {
            engineer_user_ids: [userID],
            visit_date: date
        }, (response: any) => {
            const ticketData: TicketCollectionResponse = response.data;
            setTicketData(ticketData.data);
            setProcessTicketData(ticketData.data.map((ticket) => {
                return {
                    ticket_id: ticket.id,
                    ticket_type: ticket.data.ticket_type,
                    report: '',
                    sundries: [],
                    visit_date: ticket.data.visit_date || new Date(),
                    completion_date: '',
                    is_further_work_required: false,
                    is_ready_for_invoicing: false
                }
            }))
            getTimegridTicketTime(ticketData.data, userID);
            getCustomerData([...new Set(ticketData.data.map((ticket) => ticket.data.customer_id))]);
            getSiteData([...new Set(ticketData.data.map((ticket) => ticket.data.site_id))]);
            getEquipmentData([...new Set(ticketData.data.map((ticket) => ticket.data.equipment_id))]);
            getDepartmentData([...new Set(ticketData.data.map((ticket) => ticket.data.department_id))]);
        }, setIsTicketsLoading);
    }

    const getTimegridTicketTime = (tickets: Array<TicketResponseData>, userID: number) => {
        const ticketQueryObject = tickets.map(ticket => {
            return {
                ticket_id: ticket.id,
                ticket_type: ticket.data.ticket_type
            }
        })
        getAPI(`timegrid_ticket_time`, {
            tickets: ticketQueryObject
        }, (response: any) => {
            const timegridTicketTimeData: TimegridTicketTimeCollectionResponse = response.data;
            setTimegridTicketTimeData(timegridTicketTimeData.data);
            setInvoiceTicketTimeData(timegridTicketTimeData.data.filter((ticketTime) => ticketTime.data.user_id === userID).map((ticketTime) => {
                return {
                    ticket_id: ticketTime.data.ticket_id,
                    ticket_type: ticketTime.data.ticket_type,
                    on_site_time: ticketTime.data.on_site_time,
                    travel_time: ticketTime.data.travel_time,
                    mileage: ticketTime.data.mileage,
                    expenses: ticketTime.data.expenses,
                    is_mate_rate: !(findTicket(tickets, ticketTime.data.ticket_id, ticketTime.data.ticket_type)?.data.engineers.find(engineer => engineer.user_id === userID)?.is_lead === true)
                }
            }))
        }, setIsTimegridTicketTimeLoading);
    }

    const getCustomerData = (customerIDs: Array<number>) => {
        getAPI(`customers`, {
            ids: customerIDs
        }, (response: any) => {
            const customerData: CustomerCollectionResponse = response.data;
            setCustomerData(customerData.data)
        }, setIsCustomerLoading)
    }

     const getSiteData = (siteIDs: Array<number>) => {
        getAPI(`sites`, {
            ids: siteIDs
        }, (response: any) => {
            const siteData: SiteCollectionResponse = response.data;
            setSiteData(siteData.data);
        }, setIsSiteLoading)
    }

    const getEquipmentData = (equipmentIDs: Array<number | null>) => {
        getAPI(`equipment`, {
            ids: equipmentIDs.filter((equipmentID) => equipmentID !== null)
        }, (response: any) => {
            const equipmentData: EquipmentCollectionResponse = response.data;
            setEquipmentData(equipmentData.data)
        }, setIsEquipmentLoading)
    }

    const getDepartmentData = (departmentIDs: Array<number>) => {
        getAPI(`departments`, {
            ids: departmentIDs
        }, (response: any) => {
            const departmentData: DepartmentCollectionResponse = response.data;
            setDepartmentData(departmentData.data)
        }, setIsDepartmentsLoading)
    }

    const getDepartmentMaxHours = (departmentID: number): number => {
        var maxHours = departmentData.find((department) => department.id === departmentID)?.data.day_max_hours;
        if (maxHours === undefined) maxHours = 7.5;
        return maxHours
    }

    const processTimegrid = () => {
        const invoiceTicketTime = ticketData.map((ticket) => getInvoiceTicketTime(invoiceTicketTimeData.find((ticketTime) => ticketTime.ticket_id === ticket.id && ticketTime.ticket_type === ticket.data.ticket_type), getDepartmentMaxHours(ticket.data.department_id)).map((invoiceTicketTime) => {
            return {
                date: ticket.data.visit_date,
                expenses: invoiceTicketTime.expenses,
                mileage: invoiceTicketTime.mileage,
                on_site_time: invoiceTicketTime.on_site_time,
                ticket_id: ticket.data.ticket_type !== 2 ? ticket.id : ticket.data.parent_ticket_id,
                ticket_type: ticket.data.ticket_type !== 2 ? ticket.data.ticket_type : 1,
                travel_time: invoiceTicketTime.travel_time,
                user_id: userData?.id,
                is_mate_rate: invoiceTicketTime.is_mate_rate,
                is_overtime: invoiceTicketTime.is_over_time
            }
        })).flat(1);
        putAPI(`timegrids/${timegridData?.id}/process`, {}, {
            invoice_ticket_time: invoiceTicketTime
        }, () => {
            navigate(`../`, { relative: 'path' });
        }, setIsProcessing);

    }

    const formSteps: Array<FormStep> = [
        {
            header: 'Distribute Time',
            form: (!isTicketsLoading && !isTimegridTicketTimeLoading && !isUserLoading && ticketData && invoiceTicketTimeData && userData) ? <DistributeTicketTime
                invoiceTicketTime={invoiceTicketTimeData}
                setInvoiceTicketTime={setInvoiceTicketTimeData}
                ticketData={ticketData}
                userData={userData}
            /> : <DistributeTicketTimeSkeleton/>,
            isComplete: true
        },
        {
            header: 'Review Data',
            form: !isTicketsLoading && !isEngineerDepartmentLoading && timegridData && userData && engineerDepartment && <TicketDataSummary 
                ticketData={ticketData} 
                customerData={customerData} 
                equipmentData={equipmentData} 
                invoiceTicketTime={invoiceTicketTimeData} 
                departmentData={departmentData}
                engineerDepartment={engineerDepartment}
            />,
            isComplete: true
        }  
    ]

    return (
        <>
            <OuterContainer 
                title={"Process Timegrid"} 
                id={getTimegridCode(userCode as string, new Date(date as string))}
                description="Complete this form to submit engineer time to tickets. Overtime will be calculated automatically."
                maxWidth={1100} 
            >
                <FormWizardFlex
                    steps={formSteps}
                    maxStepSubmitted={maxStepSubmitted}
                    setMaxStepSubmitted={setMaxStepSubmitted}
                    resourceName="Timegrid"
                    actionName="Process"
                    iconFont="verified"
                    isCreating={isProcessing}
                    createFunc={processTimegrid}
                />            
            </OuterContainer>
        </>
    )
}

export default ProcessTimegridPage