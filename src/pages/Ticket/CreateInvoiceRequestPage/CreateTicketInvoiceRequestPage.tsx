import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FormWizardFlex, { FormStep } from "../../../components/form/FormWizardFlex";
import OuterContainer from "../../../components/ui/Containers/OuterContainer/OuterContainer";
import { ContractResponseData } from "../../../types/contract.types";
import { CustomerResponseData } from "../../../types/customers.types";
import { DepartmentCollectionResponse, DepartmentResponseData } from "../../../types/department.types";
import { EquipmentResponseData } from "../../../types/equipment.types";
import { InvoiceTicketTimeCollectionResponse, InvoiceTicketTimeResponseData } from "../../../types/invoiceTicketTime.types";
import { InvoiceTypeResponseData } from "../../../types/invoiceTypes.types";
import { QuoteResponseData } from "../../../types/quote.types";
import { RequisitionCollectionResponse } from "../../../types/requisition.types";
import { RequisitionLineCollectionResponse, RequisitionLineResponseData } from "../../../types/requisitionLines.types";
import { SiteResponseData } from "../../../types/sites.types";
import { SystemConfigsResponseData } from "../../../types/systemConfigs.types";
import { TicketCollectionResponse, TicketResponseData } from "../../../types/tickets.types";
import { UserCollectionResponse, UserResponseData } from "../../../types/user.types";
import getAPI from "../../../utils/getAPI";
import calculateTicketCost, { TicketCost } from "../utils/calculateTicketCost";
import TicketInvoiceDetailsForm from "./TicketInvoiceDetailsForm";
import { CreateTicketInvoiceRequestAttributes, TicketInvoiceRequestResponseData } from "../../../types/TicketInvoiceRequest.types";
import updateStateCheckboxParams from "../../../utils/updateStateParams/updateStateCheckboxParams";
import updateStateParams from "../../../utils/updateStateParams/updateStateParams";
import postAPI from "../../../utils/postAPI";
import TicketInvoiceRequestInformationSkeleton from "../../InvoiceRequests/TicketInvoiceRequestPage/components/TicketInvoiceRequestInformationSkeleton";

const CreateTicketInvoiceRequestPage = () => {
    const navigate = useNavigate();
    const { departmentName, ticketNumber, ticketSuffix } = useParams();

    // Data States
    const [isDepartmentLoading, setIsDepartmentLoading] = useState(true);
    const [departmentData, setDepartmentData] = useState<DepartmentResponseData>();
    const [isTicketLoading, setIsTicketLoading] = useState(true);
    const [ticketData, setTicketData] = useState<TicketResponseData>();
    const [isCustomerLoading, setIsCustomerLoading] = useState(true);
    const [customerData, setCustomerData] = useState<CustomerResponseData>();
    const [isSiteLoading, setIsSiteLoading] = useState(false);
    const [siteData, setSiteData] = useState<SiteResponseData>();
    const [isEquipmentLoading, setIsEquipmentLoading] = useState(false);
    const [equipmentData, setEquipmentData] = useState<EquipmentResponseData>();
    const [isContractLoading, setIsContractLoading] = useState(false);
    const [contractData, setContractData] = useState<ContractResponseData>();
    const [isInvoiceTypeLoading, setIsInvoiceTypeLoading] = useState(false);
    const [invoiceType, setInvoiceType] = useState<InvoiceTypeResponseData>();
    const [isTicketInvoiceTimeLoading, setIsTicketInvoiceTimeLoading] = useState(true);
    const [ticketInvoiceTimeData, setTicketInvoiceTimeData] = useState<Array<InvoiceTicketTimeResponseData>>([]);    
    const [isUsersLoading, setIsUsersLoading] = useState(true);
    const [userData, setUserData] = useState<Array<UserResponseData>>([]);    
    const [isRequisitionsLoading, setIsRequisitionsLoading] = useState(true);
    const [requisitionsData, setRequisitionsData] = useState<RequisitionCollectionResponse>();
    const [isRequisitionLinesLoading, setIsRequisitionLinesLoading] = useState(false);
    const [requisitionLinesData, setRequisitionLinesData] = useState<Array<RequisitionLineResponseData>>([]);
    const [isQuoteLoading, setIsQuoteLoading] = useState(false);
    const [quoteData, setQuoteData] = useState<QuoteResponseData>();
    const [isSystemConfigsLoading, setIsSystemConfigsLoading] = useState(true);
    const [systemConfigsData, setSystemConfigsData] = useState<SystemConfigsResponseData>();
    const [isContinuationsLoading, setIsContinuationsLoading] = useState(true);
    const [continuationData, setContinuationData] = useState<TicketCollectionResponse>();

    // From States 
    const [maxStepSubmitted, setMaxStepSubmitted] = useState(0);    
    const [isCreating, setIsCreating] = useState(false);
    const [ticketCost, setTicketCost] = useState<TicketCost>();    
    const [invoiceRequestAttributes, setInvoiceRequestAttributes] = useState<CreateTicketInvoiceRequestAttributes>({
        requested_value: '0',
        invoice_text: '',
        accounts_notes: '',
        purchase_order_number: '',
        holding_for_purchase_order_number: false,
    });

    useEffect(() => {
        getDepartment();
    }, [departmentName]);

    useEffect(() => {
        getTicket();
    }, [departmentData, ticketNumber, ticketSuffix]);

    useEffect(() => {
        getSystemConfigs();
    }, []);

    useEffect(() => {
        var requestValue = 0;
        if (quoteData) {
            requestValue = 0;
        } else { 
            requestValue = ticketCost ? ticketCost.totalCharge : 0;
        }
        setInvoiceRequestAttributes((prevState: any) => {
            return {
                ...prevState, 
                requested_value: requestValue.toString()
            }
        });
    }, [ticketCost?.totalCharge, quoteData]);

    useEffect(() => {
        if (
            invoiceType === undefined ||
            departmentData === undefined || 
            systemConfigsData === undefined
        ) return;
        const ticketCost = calculateTicketCost(
            invoiceType,
            userData,
            ticketInvoiceTimeData,
            requisitionLinesData,
            contractData,
            departmentData,
            systemConfigsData.data.mileage_cost_rate
        );
        setTicketCost(ticketCost);
    }, [invoiceType, userData, ticketInvoiceTimeData, requisitionLinesData, contractData, departmentData, systemConfigsData])


    const getDepartment = () => {
        getAPI('departments', {
            names: [departmentName]
        }, (response: any) => {
            const departmentData: DepartmentCollectionResponse = response.data;
            const currentDepartment = departmentData.data[0];
            setDepartmentData(currentDepartment);
        }, setIsDepartmentLoading);
    }

    const getTicket = () => {
        if (!departmentData) return;
        getAPI('tickets', {
            department_ids: [departmentData.id],
            numbers: [ticketNumber],
            suffixes: [ticketSuffix]
        }, (response: any) => {
            const ticketData: TicketCollectionResponse = response.data;
            const currentTicket = ticketData.data[0];
            setTicketData(currentTicket);
            getContinuations(currentTicket.data.department_id, currentTicket.data.number);
            getRequisitions(currentTicket.data.department_id, currentTicket.data.number);
            getCustomer(currentTicket.data.customer_id);
            currentTicket.data.invoice_type_id && getInvoiceType(currentTicket.data.invoice_type_id);
            currentTicket.data.site_id && getSite(currentTicket.data.site_id);
            currentTicket.data.equipment_id && getEquipment(currentTicket.data.equipment_id);
            currentTicket.data.contract_id && getContract(currentTicket.data.contract_id);
            currentTicket.data.parent_quote_id && getQuote(currentTicket.data.parent_quote_id);
            setInvoiceRequestAttributes((prevState: any) => {
                return {
                    ...prevState, 
                    purchase_order_number: currentTicket.data.purchase_order_number ? currentTicket.data.purchase_order_number : ''
                }
            });
        }, setIsTicketLoading);
    }

    useEffect(() => {
        if (
            ticketData === undefined ||
            customerData === undefined
        ) return;
        setInvoiceRequestAttributes((prevState: any) => {
            return {
                ...prevState, 
                invoice_text: `Customer: ${customerData.data.name}
${equipmentData !== undefined ? `Equipment: ${equipmentData.data.description}/${equipmentData.data.location}` : ''}

${ticketData.data.customer_viewable_report}`
            }
        });
    }, [ticketData?.data.customer_viewable_report, customerData?.data.name, equipmentData?.data.description, , equipmentData?.data.location])

    const getCustomer = (customerID: number) => {
        getAPI(`customers/${customerID}`, {}, (response: any) => {
            const customerData: CustomerResponseData = response.data;
            setCustomerData(customerData);
        }, setIsCustomerLoading);
    }

    const getSite = (siteID: number) => {
        getAPI(`sites/${siteID}`, {}, (response: any) => {
            const sitesData: SiteResponseData = response.data;
            setSiteData(sitesData);
        }, setIsSiteLoading);
    }

    const getEquipment = (equipmentID: number) => {
        getAPI(`equipment/${equipmentID}`, {}, (response: any) => {
            const equipmentData: EquipmentResponseData = response.data;
            setEquipmentData(equipmentData);
        }, setIsEquipmentLoading);
    }

    const getContract = (contractID: number) => {
        getAPI(`contracts/${contractID}`, {}, (response: any) => {
            const contractData: ContractResponseData = response.data;
            setContractData(contractData);
        }, setIsContractLoading);
    }

    const getInvoiceType = (invoiceTypeID: number) => {
        getAPI(`invoice_types/${invoiceTypeID}`, {}, (response: any) => {
            const invoiceTypeData: InvoiceTypeResponseData = response.data;
            setInvoiceType(invoiceTypeData);
        }, setIsInvoiceTypeLoading);
    }

    const getQuote = (quoteID: number) => {
        getAPI(`quotes/${quoteID}`, {}, (response: any) => {
            const quoteData: QuoteResponseData = response.data;
            setQuoteData(quoteData);
        }, setIsQuoteLoading);
    }

    const getSystemConfigs = () => {
        getAPI('system_configs', {}, (response: any) => {
            const systemConfigsData: SystemConfigsResponseData = response.data;
            setSystemConfigsData(systemConfigsData);
        }, setIsSystemConfigsLoading);
    }

    const getContinuations = (departmentID: number, ticketNumber: number) => {
        getAPI('tickets', {
            department_ids: [departmentID],
            numbers: [ticketNumber],
        }, (response: any) => {
            const ticketData: TicketCollectionResponse = response.data;
            setContinuationData(ticketData);
            const continuations = [...new Set(ticketData.data.map(ticket => {
                return {
                    ticket_id: ticket.id,
                    ticket_type: ticket.data.ticket_type
                }
            }))];
            getInvoiceTicketTime(continuations);
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

    const getRequisitions = (departmentID: number, ticketNumber: number) => {
        getAPI('requisitions', {
            tickets: [{
                department_id: departmentID,
                ticket_number: ticketNumber
            }],
            is_complete: true
        }, (response: any) => {
            const requisitionsData: RequisitionCollectionResponse = response.data;
            if (requisitionsData.data.length > 0) {
                getRequisitionLines([...new Set(requisitionsData.data.map(requisition => requisition.data.number))]);
            } else {
                getRequisitionLines([-1]);
            }
        }, setIsRequisitionsLoading)
    }

    const getRequisitionLines = (requisitionNumber: Array<number>) => {
        getAPI('requisition_lines', {
            requisition_numbers: requisitionNumber,
        }, (response: any) => {
            const requisitionLinesData: RequisitionLineCollectionResponse = response.data;
            setRequisitionLinesData(requisitionLinesData.data);
        }, setIsRequisitionLinesLoading)
    }

    const isLoading = (
        isDepartmentLoading ||
        isTicketLoading || 
        isCustomerLoading || 
        isSiteLoading || 
        isEquipmentLoading ||
        isContractLoading ||
        isInvoiceTypeLoading 
    )

    const updateInvoiceRequestParams = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => {
        updateStateParams(event, setInvoiceRequestAttributes);
    }

    const updateInvoiceRequestCheckboxParams = (event: ChangeEvent<HTMLInputElement>) => {
        updateStateCheckboxParams(event, setInvoiceRequestAttributes);
    }

    const createInvoiceRequest = () => {
        if (ticketCost === undefined) return;
        postAPI('ticket_invoice_requests/create', {}, {
            department_id: departmentData?.id,
            ticket_number: ticketData?.data.number,
            ticket_type: ticketData?.data.ticket_type,
            labour_cost: ticketCost.labourCost,
            mileage_cost: ticketCost.materialCost,
            expenses_cost: ticketCost.expensesCost,
            material_cost: ticketCost.materialCost,
            sub_contract_cost: ticketCost.subcontractCost,
            hire_cost: ticketCost.hireCost,
            labour_charge: ticketCost.labourCharge,
            mileage_charge: ticketCost.materialCharge,
            expenses_charge: ticketCost.expensesCharge,
            material_charge: ticketCost.materialCharge,
            sub_contract_charge: ticketCost.subcontractCharge,
            hire_charge: ticketCost.hireCharge,
            ...invoiceRequestAttributes
        }, (response: any) => {
            const ticketInvoiceRequest: TicketInvoiceRequestResponseData = response.data;
            navigate(`/ticket_invoice_requests/${ticketInvoiceRequest.id}`);
        }, setIsCreating)
    }

    const isFormComplete = ( 
        invoiceRequestAttributes.requested_value.length > 0 && 
        invoiceRequestAttributes.invoice_text.length > 0
    )

    const formSteps: Array<FormStep> = [
        {
            header: 'Invoice Details',
            form: !isLoading && ticketData && departmentData && customerData && invoiceType && ticketCost && systemConfigsData ? <>
                <TicketInvoiceDetailsForm
                    invoiceRequestDetails={invoiceRequestAttributes}
                    ticket={ticketData}
                    department={departmentData}
                    customer={customerData}
                    site={siteData}
                    equipment={equipmentData}
                    invoiceType={invoiceType}
                    contract={contractData} 
                    quote={quoteData} 
                    ticketCost={ticketCost}  
                    ticketInvoiceTime={ticketInvoiceTimeData}
                    users={userData}  
                    requisitionLines={requisitionLinesData}  
                    mileageCostRate={systemConfigsData.data.mileage_cost_rate}   
                    updateParams={updateInvoiceRequestParams} 
                    updateCheckboxParams={updateInvoiceRequestCheckboxParams}
                    showErrors={maxStepSubmitted > 0}   
                />
            </> : <TicketInvoiceRequestInformationSkeleton isPreview/>,
            isComplete: isFormComplete
        },
        {
            header: 'Review Information',
            form: !isLoading && ticketData && departmentData && customerData && siteData && invoiceType && ticketCost && systemConfigsData ? <>
                <TicketInvoiceDetailsForm
                    invoiceRequestDetails={invoiceRequestAttributes}
                    ticket={ticketData}
                    department={departmentData}
                    customer={customerData}
                    site={siteData}
                    equipment={equipmentData}
                    invoiceType={invoiceType}
                    contract={contractData} 
                    quote={quoteData} 
                    ticketCost={ticketCost}  
                    ticketInvoiceTime={ticketInvoiceTimeData}
                    users={userData}  
                    requisitionLines={requisitionLinesData}  
                    mileageCostRate={systemConfigsData.data.mileage_cost_rate}   
                    updateParams={updateInvoiceRequestParams} 
                    updateCheckboxParams={updateInvoiceRequestCheckboxParams}
                    showErrors={maxStepSubmitted > 0}   
                    isPreview
                />
            </> : <TicketInvoiceRequestInformationSkeleton isPreview/>,
            isComplete: isFormComplete
        }
    ]

    return (
        <>
            <OuterContainer
                title='Create Invoice Request'
                description="Complete this form to create a ticket invoice request."
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

export default CreateTicketInvoiceRequestPage