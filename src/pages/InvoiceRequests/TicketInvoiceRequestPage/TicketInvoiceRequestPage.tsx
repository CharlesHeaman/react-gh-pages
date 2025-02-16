import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import OuterContainer from "../../../components/ui/Containers/OuterContainer/OuterContainer";
import Skeleton from "../../../components/ui/General/Skeleton/Skeleton";
import { TicketInvoiceRequestResponseData } from "../../../types/TicketInvoiceRequest.types";
import { ContractResponseData } from "../../../types/contract.types";
import { CustomerResponseData } from "../../../types/customers.types";
import { DepartmentResponseData } from "../../../types/department.types";
import { EquipmentResponseData } from "../../../types/equipment.types";
import { InvoiceTypeResponseData } from "../../../types/invoiceTypes.types";
import { QuoteResponseData } from "../../../types/quote.types";
import { SiteResponseData } from "../../../types/sites.types";
import { TicketCollectionResponse, TicketResponseData } from "../../../types/tickets.types";
import { UserResponseData } from "../../../types/user.types";
import getAPI from "../../../utils/getAPI";
import TicketTypeLabel from "../../Ticket/components/TicketTypeLabel";
import InvoiceRequestNavigation from "../components/InvoiceRequestNavigation";
import InvoiceRequestStatusLabel from "../components/InvoiceRequestStatusLabel";
import InvoiceTypeLabel from "../components/InvoiceTypeLabel";
import TicketInvoiceRequestInformation from "./components/TicketInvoiceRequestInformation";
import TicketInvoiceRequestInformationSkeleton from "./components/TicketInvoiceRequestInformationSkeleton";
import TicketInvoiceRequestSideBar from "./components/TicketInvoiceRequestSideBar";

const TicketInvoiceRequestPage = () => {
    const { ticketInvoiceRequestID } = useParams();

    // Data States
    const [isInvoiceRequestLoading, setIsInvoiceRequestLoading] = useState(true);
    const [invoiceRequestData, setInvoiceRequestData] = useState<TicketInvoiceRequestResponseData>();
    const [isTicketLoading, setIsTicketLoading] = useState(true);
    const [ticketData, setTicketData] = useState<TicketResponseData>();
    const [isCustomerLoading, setIsCustomerLoading] = useState(true);
    const [customerData, setCustomerData] = useState<CustomerResponseData>();
    const [isSiteLoading, setIsSiteLoading] = useState(true);
    const [siteData, setSiteData] = useState<SiteResponseData>();
    const [isEquipmentLoading, setIsEquipmentLoading] = useState(false);
    const [equipmentData, setEquipmentData] = useState<EquipmentResponseData>();
    const [isCreatedByUserLoading, setIsCreatedByUserLoading] = useState(true);
    const [createdByUserData, setCreatedByUserData] = useState<UserResponseData>();
    const [isProcessedByUserLoading, setIsProcessedByUserLoading] = useState(false);
    const [processedByUserData, setProcessedByUserData] = useState<UserResponseData>();
    const [isContractLoading, setIsContractLoading] = useState(false);
    const [contractData, setContractData] = useState<ContractResponseData>();
    const [isInvoiceTypeLoading, setIsInvoiceTypeLoading] = useState(false);
    const [invoiceType, setInvoiceType] = useState<InvoiceTypeResponseData>();
    const [isDepartmentLoading, setIsDepartmentLoading] = useState(true);
    const [departmentData, setDepartmentData] = useState<DepartmentResponseData>();
    const [isQuoteLoading, setIsQuoteLoading] = useState(false);
    const [quoteData, setQuoteData] = useState<QuoteResponseData>();
    
    useEffect(() => {
        getInvoiceRequest();
    }, [ticketInvoiceRequestID]);

    useEffect(() => {
        if (invoiceRequestData === undefined) return;
        if (invoiceRequestData.data.processed_by_id) {
            getProcessedByUser(invoiceRequestData.data.processed_by_id)
        }
    }, [invoiceRequestData?.data.processed_by_id]);

    const getInvoiceRequest = () => {
        getAPI(`ticket_invoice_requests/${ticketInvoiceRequestID}`, {}, (response: any) => {
            const ticketInvoiceRequestData: TicketInvoiceRequestResponseData = response.data;
            setInvoiceRequestData(ticketInvoiceRequestData);
            getTicket(ticketInvoiceRequestData.data.department_id, ticketInvoiceRequestData.data.ticket_number);
            getCreatedByUser(ticketInvoiceRequestData.data.created_by_id);
        }, setIsInvoiceRequestLoading);
    }

    const getTicket = (departmentID: number, ticketNumber: number) => {
        getAPI('tickets', {
            department_ids: [departmentID],
            numbers: [ticketNumber],
            suffixes: [0]
        }, (response: any) => {
            const ticketData: TicketCollectionResponse = response.data;
            const currentTicket = ticketData.data[0];
            setTicketData(currentTicket);
            getCustomer(currentTicket.data.customer_id);
            getDepartment(currentTicket.data.department_id);
            getSite(currentTicket.data.site_id);
            currentTicket.data.invoice_type_id && getInvoiceType(currentTicket.data.invoice_type_id);
            currentTicket.data.equipment_id && getEquipment(currentTicket.data.equipment_id);
            currentTicket.data.contract_id && getContract(currentTicket.data.contract_id);
            currentTicket.data.parent_quote_id && getQuote(currentTicket.data.parent_quote_id);
        }, setIsTicketLoading)
    }

    const getDepartment = (departmentID: number) => {
        getAPI(`departments/${departmentID}`, {}, (response: any) => {
            const departmentData: DepartmentResponseData = response.data;
            setDepartmentData(departmentData);
        }, setIsDepartmentLoading);
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

    const getCreatedByUser = (userID: number) => {
        getAPI(`users/${userID}`, {}, (response: any) => {
            const userData: UserResponseData = response.data;
            setCreatedByUserData(userData);
        }, setIsCreatedByUserLoading);
    }

    const getProcessedByUser = (userID: number) => {
        getAPI(`users/${userID}`, {}, (response: any) => {
            const userData: UserResponseData = response.data;
            setProcessedByUserData(userData);
        }, setIsProcessedByUserLoading);
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

    const isHeaderLoading = (
        isInvoiceRequestLoading
    )

    const isLoading = (
        isInvoiceRequestLoading ||
        isTicketLoading || 
        isCustomerLoading || 
        isSiteLoading || 
        isEquipmentLoading || 
        isContractLoading || 
        isCreatedByUserLoading ||
        isProcessedByUserLoading || 
        isInvoiceTypeLoading || 
        isDepartmentLoading ||
        isQuoteLoading
    )

    return (
        <>
            <InvoiceRequestNavigation location="tickets"/>
            <OuterContainer
                title='Ticket Invoice Request'
                id={ticketInvoiceRequestID}
                headerContent={!isHeaderLoading && invoiceRequestData && ticketData ? 
                    <div className="flex">
                        <InvoiceRequestStatusLabel isProcessed={invoiceRequestData.data.is_processed} isHolding={invoiceRequestData.data.holding_for_purchase_order_number}/> 
                        {invoiceType ? <InvoiceTypeLabel invoiceType={invoiceType} isQuoted={ticketData.data.parent_quote_id !== null}/> : null}
                        <TicketTypeLabel ticketType={ticketData.data.ticket_type}/>
                    </div> :
                    <div className="flex">
                        <Skeleton type="label" width={125}/>
                        <Skeleton type="label" width={125}/>
                        <Skeleton type="label" width={125}/>
                    </div>
                }
                maxWidth={1200}
                bigID
            >
                <div className="page-grid">
                    <div className="page-main">
                        {!isLoading && invoiceRequestData && ticketData && ticketData && customerData && departmentData && siteData && createdByUserData ?
                            <TicketInvoiceRequestInformation
                                invoiceRequest={invoiceRequestData}
                                ticket={ticketData}
                                department={departmentData}
                                customer={customerData}
                                site={siteData}
                                equipment={equipmentData}
                                quote={quoteData}
                                contract={contractData}
                                createdByUser={createdByUserData}
                                processedByUser={processedByUserData}
                                invoiceType={invoiceType}
                            /> :
                            <TicketInvoiceRequestInformationSkeleton/>
                        }
                    </div>
                    <div className="page-side">
                        <TicketInvoiceRequestSideBar
                            invoiceRequest={invoiceRequestData}
                            setTicketInvoiceRequestData={setInvoiceRequestData}
                        />
                    </div>
                </div>
            </OuterContainer>
        </>
    )
}

export default TicketInvoiceRequestPage