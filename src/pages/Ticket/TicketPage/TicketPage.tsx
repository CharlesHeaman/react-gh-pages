import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import OuterContainer from "../../../components/ui/Containers/OuterContainer/OuterContainer";
import Skeleton from "../../../components/ui/General/Skeleton/Skeleton";
import { TicketInvoiceRequestCollectionResponse, TicketInvoiceRequestResponseData } from "../../../types/TicketInvoiceRequest.types";
import { ContractResponseData } from "../../../types/contract.types";
import { CustomerResponseData } from "../../../types/customers.types";
import { DepartmentCollectionResponse, DepartmentResponseData } from "../../../types/department.types";
import { EquipmentResponseData } from "../../../types/equipment.types";
import { InvoiceTypeResponseData } from "../../../types/invoiceTypes.types";
import { SiteResponseData } from "../../../types/sites.types";
import { TicketCollectionResponse, TicketResponseData } from "../../../types/tickets.types";
import { UserCollectionResponse, UserResponseData } from "../../../types/user.types";
import getAPI from "../../../utils/getAPI";
import TicketInformation from "../components/TicketInformation";
import TicketSideBar from "./components/TicketSideBar/TicketSideBar";
import TicketStatuses from "./components/TicketStatuses";
import { QuoteCollectionResponse, QuoteResponseData } from "../../../types/quote.types";
import TicketInformationSkeleton from "./components/TicketInformationSkeleton";
import { ContactResponseData } from "../../../types/contact.types";
import { InterimInvoiceCollectionResponse } from "../../../types/interimInvoice.types";
import { TicketUploadCollectionResponse } from "../../../types/ticketUploads.types";
import { CreditNoteCollectionResponse } from "../../../types/creditNote.types";

const TicketPage = () => {
    const { departmentName, ticketNumber, ticketSuffix } = useParams();

    // Data States
    const [isDepartmentLoading, setIsDepartmentLoading] = useState(true);
    const [departmentData, setDepartmentData] = useState<DepartmentResponseData>();
    const [isTicketLoading, setIsTicketLoading] = useState(true);
    const [ticketData, setTicketData] = useState<TicketResponseData>();
    const [isContinuationsLoading, setIsContinuationsLoading] = useState(true);
    const [continuationData, setContinuationData] = useState<TicketCollectionResponse>();
    const [isCustomerLoading, setIsCustomerLoading] = useState(true);
    const [customerData, setCustomerData] = useState<CustomerResponseData>();
    const [isSiteLoading, setIsSiteLoading] = useState(false);
    const [siteData, setSiteData] = useState<SiteResponseData>();
    const [isEquipmentLoading, setIsEquipmentLoading] = useState(false);
    const [equipmentData, setEquipmentData] = useState<EquipmentResponseData>();
    const [isContactLoading, setIsContactLoading] = useState(false);
    const [contactData, setContactData] = useState<ContactResponseData>();
    const [isContractLoading, setIsContractLoading] = useState(false);
    const [contractData, setContractData] = useState<ContractResponseData>();
    const [isInvoiceRequestLoading, setIsInvoiceRequestLoading] = useState(false);
    const [invoiceRequest, setInvoiceRequest] = useState<TicketInvoiceRequestResponseData>();
    const [isInvoiceTypeLoading, setIsInvoiceTypeLoading] = useState(false);
    const [invoiceType, setInvoiceType] = useState<InvoiceTypeResponseData>();
    const [isInvoiceCreatedByUserLoading, setIsInvoiceCreatedByUserLoading] = useState(false);
    const [invoiceCreatedByUserData, setInvoiceCreatedByUserData] = useState<UserResponseData>();
    const [isInvoiceProcessedByUserLoading, setIsInvoiceProcessedByUserLoading] = useState(false);
    const [invoiceProcessedByUserData, setInvoiceProcessedByUserData] = useState<UserResponseData>();
    const [isEngineersLoading, setIsEngineersLoading] = useState(false)
    const [engineers, setEngineers] = useState<Array<UserResponseData>>([]);
    const [isQuoteLoading, setIsQuoteLoading] = useState(false);
    const [quoteData, setQuoteData] = useState<QuoteResponseData>();
    const [isInterimInvoicesLoading, setIsInterimInvoicesLoading] = useState(true);
    const [interimInvoiceData, setInterimInvoiceData] = useState<InterimInvoiceCollectionResponse>();
    const [isCreditNotesLoading, setIsCreditNotesLoading] = useState(true);
    const [creditNoteData, setCreditNoteData] = useState<CreditNoteCollectionResponse>();
    const [isJobLoading, setIsJobLoading] = useState(false);
    const [jobData, setJobData] = useState<QuoteResponseData>();
    const [isJobDepartmentLoading, setIsJobDepartmentLoading] = useState(false);
    const [jobDepartmentData, setJobDepartmentData] = useState<DepartmentResponseData>();

    useEffect(() => {
        getDepartment();
    }, [departmentName]);

    useEffect(() => {
        if (departmentData === undefined) return;
        getTicket(departmentData?.id);
        getInterimInvoices(departmentData?.id);
        getCreditNotes(departmentData?.id);
    }, [departmentData, ticketNumber, ticketSuffix]);

    useEffect(() => {
        if (ticketData === undefined) return;
        if (ticketData.data.engineers.length) {
            getEngineers(ticketData.data.engineers.map(engineer => engineer.user_id));
        }
    }, [ticketData?.data.engineers])


    useEffect(() => {
        if (ticketData === undefined) return;
        if (ticketData.data.customer_id) {
            getCustomer(ticketData.data.customer_id);
        }
    }, [ticketData?.data.customer_id]);

    useEffect(() => {
        if (ticketData === undefined) return;
        if (ticketData.data.contact_id) {
            getContact(ticketData.data.contact_id);
        }
    }, [ticketData?.data.contact_id]);

    useEffect(() => {
        if (ticketData === undefined) return;
        if (ticketData.data.site_id) {
            getSite(ticketData.data.site_id);
        }
    }, [ticketData?.data.site_id]);

    useEffect(() => {
        if (ticketData === undefined) return;
        if (ticketData.data.invoice_type_id) {
            getInvoiceType(ticketData.data.invoice_type_id);
        }
    }, [ticketData?.data.invoice_type_id]);

    useEffect(() => {
        if (ticketData === undefined) return;
        if (ticketData.data.equipment_id) {
            getEquipment(ticketData.data.equipment_id);
        }
    }, [ticketData?.data.equipment_id]);

    useEffect(() => {
        if (ticketData === undefined) return;
        if (ticketData.data.contract_id) {
            getContract(ticketData.data.contract_id);
        }
    }, [ticketData?.data.contract_id]);

    useEffect(() => {
        if (ticketData === undefined) return;
        if (ticketData.data.job_number) {
            getJob(ticketData.data.job_number);
        } else {
            setJobData(undefined);
        }
    }, [ticketData?.data.job_number]);



    const getDepartment = () => {
        getAPI('departments', {
            names: [departmentName]
        }, (response: any) => {
            const departmentData: DepartmentCollectionResponse = response.data;
        const currentDepartment = departmentData.data[0];
            setDepartmentData(currentDepartment);
        }, setIsDepartmentLoading);
    }

    const getTicket = (departmentID: number) => {
        getAPI('tickets', {
            department_ids: [departmentID],
            numbers: [ticketNumber],
            suffixes: [ticketSuffix]
        }, (response: any) => {
            const ticketData: TicketCollectionResponse = response.data;
            const currentTicket = ticketData.data[0];
            setTicketData(currentTicket);
            getInvoiceRequest(currentTicket.data.number, currentTicket.data.department_id);
            getContinuations(currentTicket.data.number, currentTicket.data.department_id);
            currentTicket.data.parent_quote_id && getQuote(currentTicket.data.parent_quote_id);
        }, setIsTicketLoading)
    }

    const getContinuations = (ticketNumber: number, departmentID: number) => {
        getAPI('tickets', {
            department_ids: [departmentID],
            numbers: [ticketNumber],
        }, (response: any) => {
            const ticketData: TicketCollectionResponse = response.data;
            setContinuationData(ticketData);
        }, setIsContinuationsLoading)
    }

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

    const getContact = (contactID: number) => {
        getAPI(`contacts/${contactID}`, {}, (response: any) => {
            const contactData: ContactResponseData = response.data;
            setContactData(contactData);
        }, setIsContactLoading);
    }

    const getInvoiceRequest = (ticketNumber: number, departmentID: number) => {
        getAPI(`ticket_invoice_requests`, {
            tickets: [{
                ticket_number: ticketNumber,
                department_id: departmentID
            }]
        }, (response: any) => {
            const invoiceRequest: TicketInvoiceRequestCollectionResponse = response.data;
            if (invoiceRequest.data.length > 0) {
                const currentInvoiceRequest = invoiceRequest.data[0];
                setInvoiceRequest(currentInvoiceRequest);
                getInvoiceCreatedByUser(currentInvoiceRequest.data.created_by_id);
                currentInvoiceRequest.data.processed_by_id && getInvoiceProcessedByUser(currentInvoiceRequest.data.processed_by_id);
            }
        }, setIsInvoiceRequestLoading);
    }

    const getInvoiceCreatedByUser = (userID: number) => {
        getAPI(`users/${userID}`, {}, (response: any) => {
            const userData: UserResponseData = response.data;
            setInvoiceCreatedByUserData(userData);
        }, setIsInvoiceCreatedByUserLoading);
    }

    const getInvoiceProcessedByUser = (userID: number) => {
        getAPI(`users/${userID}`, {}, (response: any) => {
            const userData: UserResponseData = response.data;
            setInvoiceProcessedByUserData(userData);
        }, setIsInvoiceProcessedByUserLoading);
    }

    const getEngineers = (userIDs: Array<number>) => {
        getAPI('users', {
            ids: userIDs
        }, (response: any) => {
            const engineerData: UserCollectionResponse = response.data;
            setEngineers(engineerData.data);
        }, setIsEngineersLoading)
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

    const getJob = (jobNumber: string) => {
        getAPI('quotes', {
            number: jobNumber
        }, (response: any) => {
            const quoteData: QuoteCollectionResponse = response.data;
            const currentJob = quoteData.data[0];
            if (currentJob) {
                setJobData(currentJob);
                getJobDepartment(currentJob.data.department_id);
            }
        }, setIsJobLoading);
    }

    const getJobDepartment = (departmentID: number) => {
        getAPI(`departments/${departmentID}`, {}, (response: any) => {
            const departmentData: DepartmentResponseData = response.data;
            setJobDepartmentData(departmentData);
        }, setIsJobDepartmentLoading);
    }

    const getInterimInvoices = (departmentID: number) => {
        getAPI('interim_invoices', {
            tickets: [
                {
                    ticket_number: ticketNumber,
                    department_id: departmentID
                }
            ]
        }, (response: any) => {
            const interimInvoiceData: InterimInvoiceCollectionResponse = response.data;
            setInterimInvoiceData(interimInvoiceData);
        }, setIsInterimInvoicesLoading);
    }

    const getCreditNotes = (departmentID: number) => {
        getAPI('credit_notes', {
            tickets: [
                {
                    ticket_number: ticketNumber,
                    department_id: departmentID
                }
            ]
        }, (response: any) => {
            const creditNoteData: CreditNoteCollectionResponse = response.data;
            setCreditNoteData(creditNoteData);
        }, setIsCreditNotesLoading);
    }

    const isLoading = (
        isDepartmentLoading ||
        isTicketLoading || 
        isCustomerLoading || 
        isSiteLoading || 
        isEquipmentLoading ||
        isContractLoading ||
        isInvoiceTypeLoading || 
        isInvoiceRequestLoading || 
        isInvoiceCreatedByUserLoading || 
        isInvoiceProcessedByUserLoading || 
        isEngineersLoading || 
        isQuoteLoading || 
        isInterimInvoicesLoading || 
        isCreditNotesLoading || 
        isJobLoading ||
        isContactLoading || 
        isJobDepartmentLoading
    )

    const isHeaderLoading = (
        isTicketLoading || 
        isInvoiceRequestLoading
    )

    return (
        <>
            <OuterContainer
                title='Ticket'
                id={`${ticketNumber}${parseInt(ticketSuffix as string) > 0 ? `/${ticketSuffix}` : ''}`}
                headerContent={!isHeaderLoading && ticketData ?
                    <TicketStatuses ticket={ticketData} invoiceRequest={invoiceRequest}/>
                    :
                    <div className="flex">
                        <Skeleton type='label'/>
                        <Skeleton type='label'/>
                    </div>}
                maxWidth={1200}
                bigID
            >
                <div className="page-grid">
                    <div className="page-main">
                        {!isLoading && ticketData && departmentData && ticketData && customerData && continuationData && interimInvoiceData && creditNoteData ?
                            <TicketInformation
                                ticket={ticketData}
                                customer={customerData}
                                site={siteData}
                                equipment={equipmentData}
                                invoiceType={invoiceType}
                                contract={contractData}
                                contact={contactData}
                                quote={quoteData}
                                job={jobData}
                                jobDepartment={jobDepartmentData}
                                department={departmentData}
                                invoiceRequest={invoiceRequest}
                                invoiceCreatedByUser={invoiceCreatedByUserData}
                                invoiceProcessedByUser={invoiceProcessedByUserData}
                                engineers={engineers}
                                continuations={continuationData.data}
                                interimInvoices={interimInvoiceData.data}
                                creditNotes={creditNoteData.data}
                            /> :
                            <TicketInformationSkeleton/>
                        }
                    </div>
                    <div className="page-side">
                        <TicketSideBar
                            ticket={ticketData}
                            customer={customerData}
                            site={siteData}
                            equipment={equipmentData}
                            department={departmentData}
                            isInvoiced={invoiceRequest !== undefined}
                            setTicketData={setTicketData}
                            contract={contractData}
                            engineers={engineers}
                            invoiceType={invoiceType}
                            contact={contactData}
                            quote={quoteData}
                            job={jobData}
                            continuations={continuationData}
                            getInterimInvoices={getInterimInvoices}
                            getCreditNotes={getCreditNotes}
                        />
                    </div>
                </div>
            </OuterContainer>
        </>
    )
}

export default TicketPage