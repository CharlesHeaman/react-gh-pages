import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FormWizardFlex, { FormStep } from "../../components/form/FormWizardFlex";
import OuterContainer from "../../components/ui/Containers/OuterContainer/OuterContainer";
import { CustomerResponseData } from "../../types/customers.types";
import { DepartmentCollectionResponse, DepartmentResponseData } from "../../types/department.types";
import { InvoiceTicketTimeCollectionResponse, InvoiceTicketTimeResponseData } from "../../types/invoiceTicketTime.types";
import { JobInvoiceRequestResponseData } from "../../types/JobInvoiceRequest";
import { QuoteCollectionResponse, QuoteResponseData } from "../../types/quote.types";
import { RequisitionCollectionResponse } from "../../types/requisition.types";
import { RequisitionLineCollectionResponse, RequisitionLineResponseData } from "../../types/requisitionLines.types";
import { SystemConfigsResponseData } from "../../types/systemConfigs.types";
import { CreateTicketInvoiceRequestAttributes } from "../../types/TicketInvoiceRequest.types";
import { TicketCollectionResponse } from "../../types/tickets.types";
import { UserCollectionResponse, UserResponseData } from "../../types/user.types";
import getAPI from "../../utils/getAPI";
import postAPI from "../../utils/postAPI";
import updateStateCheckboxParams from "../../utils/updateStateParams/updateStateCheckboxParams";
import updateStateParams from "../../utils/updateStateParams/updateStateParams";
import TicketInvoiceRequestInformationSkeleton from "../InvoiceRequests/TicketInvoiceRequestPage/components/TicketInvoiceRequestInformationSkeleton";
import calculateJobCost, { JobCost } from "./components/JobSideBar/components/JobActions/utils/calculateJobCost";
import JobInvoiceDetailsForm from "./JobInvoiceDetailsForm";


const CreateJobInvoiceRequestPage = () => {
    const navigate = useNavigate();
    const { departmentName, jobNumber } = useParams();

    // Data States
    const [isJobLoading, setIsJobLoading] = useState(true);
    const [jobData, setJobData] = useState<QuoteResponseData>();
    const [isDepartmentLoading, setIsDepartmentLoading] = useState(true);
    const [departmentData, setDepartmentData] = useState<DepartmentResponseData>();
    const [isCustomerLoading, setIsCustomerLoading] = useState(false);
    const [customerData, setCustomerData] = useState<CustomerResponseData>();
    const [isJobRequisitionsLoading, setIsJobRequisitionsLoading] = useState(true);
    const [jobRequisitionNumbers, setJobRequisitionNumbers] = useState<Array<number>>([]);
    const [isTicketRequisitionsLoading, setIsTicketRequisitionsLoading] = useState(true);
    const [ticketRequisitionNumbers, setTicketRequisitionNumbers] = useState<Array<number>>([]);
    const [isTicketInvoiceTimeLoading, setIsTicketInvoiceTimeLoading] = useState(true);
    const [ticketInvoiceTimeData, setTicketInvoiceTimeData] = useState<Array<InvoiceTicketTimeResponseData>>([]);    
    const [isUsersLoading, setIsUsersLoading] = useState(true);
    const [userData, setUserData] = useState<Array<UserResponseData>>([]);    
    const [isRequisitionLinesLoading, setIsRequisitionLinesLoading] = useState(false);
    const [requisitionLinesData, setRequisitionLinesData] = useState<Array<RequisitionLineResponseData>>([]);
    const [isSystemConfigsLoading, setIsSystemConfigsLoading] = useState(true);
    const [systemConfigsData, setSystemConfigsData] = useState<SystemConfigsResponseData>();
    const [isContinuationsLoading, setIsContinuationsLoading] = useState(true);
    const [continuationData, setContinuationData] = useState<TicketCollectionResponse>();

    // From States 
    const [maxStepSubmitted, setMaxStepSubmitted] = useState(0);    
    const [isCreating, setIsCreating] = useState(false);
    const [jobCost, setJobCost] = useState<JobCost>();    
    const [invoiceRequestAttributes, setInvoiceRequestAttributes] = useState<CreateTicketInvoiceRequestAttributes>({
        requested_value: '0',
        invoice_text: '',
        accounts_notes: '',
        purchase_order_number: '',
        holding_for_purchase_order_number: false,
    });

    useEffect(() => {
        getJobData();
    }, [jobNumber]);

    useEffect(() => {
        getDepartment();
    }, [departmentName]);

    useEffect(() => {
        const allRequisitionNumbers = jobRequisitionNumbers.concat(ticketRequisitionNumbers);
        if (allRequisitionNumbers.length > 0) {
            getRequisitionLines([...new Set(allRequisitionNumbers)]);
        } else {
            getRequisitionLines([-1]);
        }
    }, [jobRequisitionNumbers, ticketRequisitionNumbers]);

    const getJobData = () => {
        getAPI(`quotes`, {
            number: jobNumber
        }, (response: any) => {
            const jobData: QuoteCollectionResponse = response.data;
            const currentJob = jobData.data[0];
            setJobData(currentJob);
            getCustomer(currentJob.data.customer_id);
            getContinuations(currentJob.data.number);
            getJobRequisitions(currentJob.data.department_id, currentJob.data.number);
        }, setIsJobLoading);
    }

    const getDepartment = () => {
        getAPI('departments', {
            names: [departmentName]
        }, (response: any) => {
            const departmentData: DepartmentCollectionResponse = response.data;
            const currentDepartment = departmentData.data[0];
            setDepartmentData(currentDepartment);
        }, setIsDepartmentLoading);
    }

    const getCustomer = (customerID: number) => {
        if (customerID === 0) return;
        getAPI(`customers/${customerID}`, {}, (response: any) => {
            const customerData: CustomerResponseData = response.data;
            setCustomerData(customerData);
        }, setIsCustomerLoading);
    }

    useEffect(() => {
        getSystemConfigs();
    }, []);

    useEffect(() => {
        if (jobData === undefined) return;
        setInvoiceRequestAttributes((prevState: any) => {
            return {
                ...prevState, 
                requested_value: jobData.data.value.toString()
            }
        });
    }, [jobData?.data.value]);

    useEffect(() => {
        if (systemConfigsData === undefined) return;
        const jobCost = calculateJobCost(
            userData,
            ticketInvoiceTimeData,
            requisitionLinesData,
            systemConfigsData.data.mileage_cost_rate
        );
        setJobCost(jobCost);
    }, [systemConfigsData, userData]);

    const getSystemConfigs = () => {
        getAPI('system_configs', {}, (response: any) => {
            const systemConfigsData: SystemConfigsResponseData = response.data;
            setSystemConfigsData(systemConfigsData);
        }, setIsSystemConfigsLoading);
    }

    const getContinuations = (jobNumber: string) => {
        getAPI('tickets', {
            job_number: jobNumber,
        }, (response: any) => {
            const ticketData: TicketCollectionResponse = response.data;
            setContinuationData(ticketData);
            const continuations = [...new Set(ticketData.data.map(ticket => {
                return {
                    ticket_id: ticket.id,
                    ticket_type: ticket.data.ticket_type
                }
            }))];
            const jobDepartmentTickets = [...new Set(ticketData.data.map(ticket => {
                return {
                    department_id: ticket.data.department_id,
                    ticket_number: ticket.data.number
                }
            }))];
            getInvoiceTicketTime(continuations);
            getTicketRequisitions(jobDepartmentTickets);
        }, setIsContinuationsLoading);
    }

    const getInvoiceTicketTime = (tickets: Array<any>) => {
        getAPI(`invoice_ticket_time`, {
            tickets: tickets,
        }, (response: any) => {
            const ticketInvoiceTimeData: InvoiceTicketTimeCollectionResponse = response.data;
            setTicketInvoiceTimeData(ticketInvoiceTimeData.data);
            if (ticketInvoiceTimeData && ticketInvoiceTimeData.data.length > 0) {
                getUsers([...new Set(ticketInvoiceTimeData.data.map(refrigerantMovement => refrigerantMovement.data.user_id))]);
            }
        }, setIsTicketInvoiceTimeLoading)    
    }

    const getUsers = (userIDs: Array<number | null>) => {
        getAPI('users', {
            ids: userIDs
        }, (response: any) => {
            const userData: UserCollectionResponse = response.data;
            setUserData(userData.data)
        }, setIsUsersLoading)
    }

    const getJobRequisitions = (departmentID: number, jobNumber: string) => {
        getAPI('requisitions', {
            jobs: [{
                department_id: departmentID,
                job_number: jobNumber
            }],
            is_complete: true
        }, (response: any) => {
            const requisitionsData: RequisitionCollectionResponse = response.data;
            setJobRequisitionNumbers([...new Set(requisitionsData.data.map(requisition => requisition.data.number))])
        }, setIsJobRequisitionsLoading)
    }

    const getTicketRequisitions = (tickets: Array<any>) => {
        getAPI('requisitions', {
            tickets: tickets,
            is_complete: true
        }, (response: any) => {
            const requisitionsData: RequisitionCollectionResponse = response.data;
            setTicketRequisitionNumbers([...new Set(requisitionsData.data.map(requisition => requisition.data.number))])
        }, setIsTicketRequisitionsLoading)
    }
    const getRequisitionLines = (requisitionNumber: Array<number>) => {
        getAPI('requisition_lines', {
            req_no: requisitionNumber,
            perPage: 2000
        }, (response: any) => {
            const requisitionLinesData: RequisitionLineCollectionResponse = response.data;
            setRequisitionLinesData(requisitionLinesData.data);
        }, setIsRequisitionLinesLoading)
    }

    const isLoading = (
        isDepartmentLoading ||
        isJobLoading || 
        isCustomerLoading ||
        isJobRequisitionsLoading ||
        isTicketRequisitionsLoading ||
        isRequisitionLinesLoading
    )

    const updateInvoiceRequestParams = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => {
        updateStateParams(event, setInvoiceRequestAttributes);
    }

    const updateInvoiceRequestCheckboxParams = (event: ChangeEvent<HTMLInputElement>) => {
        updateStateCheckboxParams(event, setInvoiceRequestAttributes);
    }

    const createInvoiceRequest = () => {
        if (jobCost === undefined) return;
        postAPI('job_invoice_requests/create', {}, {
            department_id: departmentData?.id,
            job_number: jobData?.data.number,
            labour_cost: jobCost.labourCost,
            mileage_cost: jobCost.mileageCost,
            expenses_cost: jobCost.expensesCost,
            material_cost: jobCost.materialCost,
            sub_contract_cost: jobCost.subcontractCost,
            hire_cost: jobCost.hireCost,
            ...invoiceRequestAttributes
        }, (response: any) => {
            const ticketInvoiceRequest: JobInvoiceRequestResponseData = response.data;
            navigate(`/job_invoice_requests/${ticketInvoiceRequest.id}`);
        }, setIsCreating)
    }

    const isFormComplete = ( 
        invoiceRequestAttributes.requested_value.length > 0 && 
        invoiceRequestAttributes.invoice_text.length > 0
    )

    const formSteps: Array<FormStep> = [
        {
            header: 'Invoice Details',
            form: !isLoading && jobData && departmentData && jobCost && systemConfigsData ? 
                <JobInvoiceDetailsForm
                    job={jobData}
                    department={departmentData}
                    customer={customerData}
                    users={userData}
                    ticketInvoiceTime={ticketInvoiceTimeData}
                    invoiceRequestDetails={invoiceRequestAttributes}
                    requisitionLines={requisitionLinesData}
                    jobCost={jobCost}  
                    updateParams={updateInvoiceRequestParams} 
                    mileageCostRate={systemConfigsData.data.mileage_cost_rate}   
                    updateCheckboxParams={updateInvoiceRequestCheckboxParams}
                    showErrors={maxStepSubmitted > 0}   
                />
            : <TicketInvoiceRequestInformationSkeleton isPreview/>,
            isComplete: isFormComplete
        },
        {
            header: 'Review Information',
            form: !isLoading && jobData && departmentData && jobCost && systemConfigsData ? 
            <JobInvoiceDetailsForm
                job={jobData}
                department={departmentData}
                customer={customerData}
                users={userData}
                ticketInvoiceTime={ticketInvoiceTimeData}
                invoiceRequestDetails={invoiceRequestAttributes}
                requisitionLines={requisitionLinesData}
                jobCost={jobCost}  
                updateParams={updateInvoiceRequestParams} 
                mileageCostRate={systemConfigsData.data.mileage_cost_rate}   
                updateCheckboxParams={updateInvoiceRequestCheckboxParams}
                showErrors={maxStepSubmitted > 0}   
                isPreview
            />
            : <TicketInvoiceRequestInformationSkeleton isPreview/>,
            isComplete: isFormComplete
        }
    ]

    return (
        <>
            <OuterContainer
                title='Create Invoice Request'
                description="Complete this form to create a job invoice request."
                maxWidth={1200}
            >
                <FormWizardFlex
                    steps={formSteps}
                    maxStepSubmitted={maxStepSubmitted}
                    setMaxStepSubmitted={setMaxStepSubmitted}
                    resourceName="Ticket Invoice Request"
                    isCreating={isCreating}
                    createFunc={createInvoiceRequest}
                />
            </OuterContainer>
        </>
    )
}

export default CreateJobInvoiceRequestPage