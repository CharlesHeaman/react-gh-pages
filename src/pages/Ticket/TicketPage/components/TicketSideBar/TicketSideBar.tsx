import { Dispatch, SetStateAction, useEffect, useState } from "react";
import PermsProtectedComponent from "../../../../../components/PermsProtectedComponent";
import { ContactCollectionResponse, ContactResponseData } from "../../../../../types/contact.types";
import { ContractResponseData } from "../../../../../types/contract.types";
import { CustomerResponseData } from "../../../../../types/customers.types";
import { DepartmentResponseData } from "../../../../../types/department.types";
import { EngineerEquipmentDetailsCollectionResponse } from "../../../../../types/engineerEquipmentDetails.types";
import { EquipmentResponseData } from "../../../../../types/equipment.types";
import { InvoiceTicketTimeCollectionResponse } from "../../../../../types/invoiceTicketTime.types";
import { InvoiceTypeResponseData } from "../../../../../types/invoiceTypes.types";
import { PurchaseOrderCollectionResponse } from "../../../../../types/purchaseOrder.types";
import { QuoteResponseData } from "../../../../../types/quote.types";
import { RefrigerantMovementCollectionResponse } from "../../../../../types/refrigerantMovement.types";
import { RequisitionCollectionResponse } from "../../../../../types/requisition.types";
import { RequisitionLineCollectionResponse } from "../../../../../types/requisitionLines.types";
import { SiteListNoteCollectionResponse } from "../../../../../types/siteListNotes.types";
import { SiteResponseData } from "../../../../../types/sites.types";
import { StoresNotificationCollectionResponse } from "../../../../../types/storesNotifications.types";
import { TicketNoteCollectionResponse } from "../../../../../types/ticketNotes.types";
import { TicketCollectionResponse, TicketResponseData } from "../../../../../types/tickets.types";
import { UserResponseData } from "../../../../../types/user.types";
import getAPI from "../../../../../utils/getAPI";
import ExportResource from "../../../../CustomerAdmin/Contacts/ContactPage/components/ContactSideBar/components/ContactDeactivate/ExportResource";
import TicketAbandon from "./components/TicketAbandon/TicketAbandon";
import TicketActions from "./components/TicketActions/TicketActions";
import TicketAssociatedData from "./components/TicketAssociatedData/TicketAssociatedData";
import TicketEngineer from "./components/TicketEngineer/TicketEngineer";
import TicketEquipmentHistory from "./components/TicketEquipmentHistory/TicketEquipmentHistory";
import TicketJob from "./components/TicketJob/TicketJob";
import TicketLabour from "./components/TicketRefrigerantMovements/TicketLabour";
import TicketRefrigerantMovements from "./components/TicketRefrigerantMovements/TicketRefrigerantMovements";
import TicketMaterials from "./components/TicketRequisitions/TicketMaterials";
import TicketSideBarSkeleton from "./components/TicketSideBarSkeleton";
import TicketRAMS from "./components/TicketUploads";
import TicketAccounts from "./TicketAccounts";
import SideBarModule from "../../../../../components/ui/Containers/SideBarModule/SideBarModule";
import SideBarButton from "../../../../../components/ui/Buttons/SideBarButton/SideBarButton";

const TicketSideBar = (props: {
    ticket: TicketResponseData | undefined,
    customer: CustomerResponseData | undefined,
    site: SiteResponseData | undefined,
    department: DepartmentResponseData | undefined,
    equipment: EquipmentResponseData | undefined,
    isInvoiced: boolean,
    contact: ContactResponseData | undefined,
    contract: ContractResponseData | undefined,
    invoiceType: InvoiceTypeResponseData | undefined,
    engineers: Array<UserResponseData>,
    quote: QuoteResponseData | undefined,
    job: QuoteResponseData | undefined,
    setTicketData: Dispatch<SetStateAction<TicketResponseData | undefined>>,
    continuations: TicketCollectionResponse | undefined,
    getInterimInvoices: (departmentID: number) => void,
    getCreditNotes: (departmentID: number) => void,
}) => {
    // Data States
    const [isRefrigerantMovementsLoading, setIsRefrigerantMovementsLoading] = useState(true);
    const [refrigerantMovementsData, setRefrigerantMovementsData] = useState<RefrigerantMovementCollectionResponse>();
    const [isRequisitionsLoading, setIsRequisitionsLoading] = useState(true);
    const [isRequisitionLinesLoading, setIsRequisitionLinesLoading] = useState(false);
    const [requisitionLinesData, setRequisitionLinesData] = useState<RequisitionLineCollectionResponse>();
    const [isPurchaseOrdersLoading, setIsPurchaseOrdersLoading] = useState(true);
    const [purchaseOrderData, setPurchaseOrderData] = useState<PurchaseOrderCollectionResponse>();
    const [isInvoiceTicketTimeLoading, setIsInvoiceTicketTimeLoading] = useState(true);
    const [invoiceTicketTimeData, setInvoiceTicketTimeData] = useState<InvoiceTicketTimeCollectionResponse>();
    const [isEngineerEquipmentDetailsLoading, setIsEngineerEquipmentDetailsLoading] = useState(true);
    const [engineerEquipmentDetailsData, setEngineerEquipmentDetailsData] = useState<EngineerEquipmentDetailsCollectionResponse>();
    const [isNotesLoading, setIsNotesLoading] = useState(false);
    const [notesData, setNotesData] = useState<TicketNoteCollectionResponse>();
    const [isContactsLoading, setIsContactsLoading ] = useState(false);
    const [contactsData, setContactsData] = useState<ContactCollectionResponse>();
    const [isEquipmentRefrigerantMovementsLoading, setIsEquipmentRefrigerantMovementsLoading] = useState(false);
    const [equipmentRefrigerantMovementData, setEquipmentRefrigerantMovementData] = useState<RefrigerantMovementCollectionResponse>();
    const [isServiceHistoryLoading, setIsServiceHistoryLoading] = useState(false);
    const [serviceTicketsData, setServiceTicketsData] = useState<TicketCollectionResponse>();
    const [isMaintenanceHistoryLoading, setIsMaintenanceHistoryLoading] = useState(false);
    const [maintenanceHistoryData, setMaintenanceHistoryData] = useState<SiteListNoteCollectionResponse>();
    const [isVanStockRequestLoading, setIsVanStockRequestLoading] = useState(true);
    const [vanStockRequestData, setVanStockRequestData] = useState<StoresNotificationCollectionResponse>();
    const [isSiteListNotesLoading, setIsSiteListNotesLoading] = useState(false);
    const [siteListNotesData, setSiteListNotesData] = useState<SiteListNoteCollectionResponse>();
    
    useEffect(() => {
        getRefrigerantMovements();
        getRequisitions();
        getPurchaseOrders();
        getSiteListNotes();
    }, [props.ticket]);

    useEffect(() => {
        if (props.customer === undefined) return;
        getSiteContacts();
    }, [props.customer, props.site]);

    useEffect(() => {
        if (props.equipment === undefined) return;
        getServiceHistory(props.equipment.id);
        getMaintenanceHistory(props.equipment.id);
    }, [props.equipment])

    useEffect(() => {
        if (props.continuations === undefined) return;
        const continuations = [...new Set(props.continuations.data.map(ticket => {
            return {
                ticket_id: ticket.id,
                ticket_type: ticket.data.ticket_type
            }
        }))];
        getInvoiceTicketTime(continuations);
        getEngineerEquipmentDetails(continuations);
        getTicketNotes(continuations);
        getVanStockRequests(continuations);
    }, [props.continuations?.data]);

    const getRefrigerantMovements = () => {
        if (!props.ticket) return;
        getAPI('refrigerant_movements', {
            ticket_number: props.ticket.data.number,
            perPage: 1
        }, (response: any) => {
            const refrigerantMovementData: RefrigerantMovementCollectionResponse = response.data;
            setRefrigerantMovementsData(refrigerantMovementData);
        }, setIsRefrigerantMovementsLoading)
    }

    const getPurchaseOrders = () => {
        if (!props.ticket) return;
        getAPI('purchase_orders', {
            tickets: [{
                department_id: props.ticket.data.department_id,
                ticket_number: props.ticket.data.number
            }],
            perPage: 1
        }, (response: any) => {
            const purchaseOrderData: PurchaseOrderCollectionResponse = response.data;
            setPurchaseOrderData(purchaseOrderData);
        }, setIsPurchaseOrdersLoading)
    }

    const getRequisitions = () => {
        if (!props.ticket) return;
        getAPI('requisitions', {
            tickets: [{
                department_id: props.ticket.data.department_id,
                ticket_number: props.ticket.data.number
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
            perPage: 1
        }, (response: any) => {
            const requisitionLinesData: RequisitionLineCollectionResponse = response.data;
            setRequisitionLinesData(requisitionLinesData);
        }, setIsRequisitionLinesLoading)
    }

    const getInvoiceTicketTime = (tickets: Array<any>) => {
        getAPI('invoice_ticket_time', {
            tickets: tickets,
            perPage: 1
        }, (response: any) => {
            const invoiceTicketTimeData: InvoiceTicketTimeCollectionResponse = response.data;
            setInvoiceTicketTimeData(invoiceTicketTimeData);
        }, setIsInvoiceTicketTimeLoading)
    }

    const getEngineerEquipmentDetails = (tickets: Array<any>) => {
        getAPI('engineer_equipment_details', {
            tickets: tickets,
            perPage: 1
        }, (response: any) => {
            const engineerEquipmentDetailsData: EngineerEquipmentDetailsCollectionResponse = response.data;
            setEngineerEquipmentDetailsData(engineerEquipmentDetailsData);
        }, setIsEngineerEquipmentDetailsLoading)
    }

    const getTicketNotes = (tickets: Array<any>) => {
        getAPI('ticket_notes', {
            tickets: tickets,
            perPage: 1
        }, (response: any) => {
            const notesData: TicketNoteCollectionResponse = response.data;
            setNotesData(notesData);
        }, setIsNotesLoading)
    }

    const getVanStockRequests = (tickets: Array<any>) => {
        getAPI('stores_notifications', {
            tickets: tickets,
            perPage: 1
        }, (response: any) => {
            const storesNotificationData: StoresNotificationCollectionResponse = response.data;
            setVanStockRequestData(storesNotificationData);
        }, setIsVanStockRequestLoading)
    }

    const getSiteContacts = () => {
        getAPI('contacts', {
            customer_ids: [props.customer?.id],
            site_id: props.site?.id,
            perPage: 1
        }, (response: any) => {
            const contactData: ContactCollectionResponse = response.data;
            setContactsData(contactData);
        }, setIsContactsLoading)
    }

    const getServiceHistory = (equipmentID: number) => {
        getAPI(`tickets`, {
            equipment_id: equipmentID,
        }, (response: any) => {
            const serviceTicketData: TicketCollectionResponse = response.data;
            setServiceTicketsData(serviceTicketData);
            if (serviceTicketData.data.length > 0) {
                getEquipmentRefrigerantMovements([...new Set(serviceTicketData.data.map(ticket => ticket.data.number))])
            } else {
                getEquipmentRefrigerantMovements([-1])
            }
        }, setIsServiceHistoryLoading)    
    } 

    const getMaintenanceHistory = (equipmentID: number) => {
        getAPI(`site_list_notes`, {
            equipment_ids: [equipmentID],
            perPage: 1
        }, (response: any) => {
            const maintenanceHistoryData: SiteListNoteCollectionResponse = response.data;
            setMaintenanceHistoryData(maintenanceHistoryData);
        }, setIsMaintenanceHistoryLoading);
    } 

    const getEquipmentRefrigerantMovements = (ticketNumbers: Array<number>) => {
        getAPI(`refrigerant_movements`, {
            ticket_numbers: ticketNumbers,
            perPage: 1
        }, (response: any) => {
            const refrigerantMovementData: RefrigerantMovementCollectionResponse = response.data;
            setEquipmentRefrigerantMovementData(refrigerantMovementData);
        }, setIsEquipmentRefrigerantMovementsLoading)    
    } 

    const getSiteListNotes = () => {
        if (!props.ticket) return;
        getAPI(`site_list_notes`, {
            ticket_ids: [props.ticket.id],
            perPage: 1
        }, (response: any) => {
            const siteListNotesData: SiteListNoteCollectionResponse = response.data;
            setSiteListNotesData(siteListNotesData);
        }, setIsSiteListNotesLoading)    
    }

    const isLoading = (
        isRefrigerantMovementsLoading || 
        isRequisitionsLoading || 
        isRequisitionLinesLoading || 
        isInvoiceTicketTimeLoading || 
        isEngineerEquipmentDetailsLoading ||
        isNotesLoading ||
        isContactsLoading ||
        isServiceHistoryLoading || 
        isEquipmentRefrigerantMovementsLoading || 
        isPurchaseOrdersLoading || 
        isSiteListNotesLoading
    )

    return (
        !isLoading && props.ticket && props.customer && props.department && props.continuations && refrigerantMovementsData && requisitionLinesData && purchaseOrderData && invoiceTicketTimeData && engineerEquipmentDetailsData && notesData && contactsData && vanStockRequestData && siteListNotesData ? <>
            <PermsProtectedComponent requiredPerms={{ tickets: 2 }}>
                {props.department.data.uses_collection_module ?
                    <SideBarModule title="Collection">
                        <SideBarButton
                            text="Send Collection Note"
                            iconFont="attach_email"
                            color="purple"
                            clickEvent={() => {}}
                        />
                        <SideBarButton
                            text="Send Part Collection"
                            iconFont="rule"
                            color="dark-purple"
                            clickEvent={() => {}}
                        />
                        <SideBarButton
                            text="Mark as Collected"
                            iconFont="verified"
                            color="dark-blue"
                            clickEvent={() => {}}
                        />
                    </SideBarModule>
                : null}
            </PermsProtectedComponent>
            <PermsProtectedComponent requiredPerms={{ tickets: 2 }}>
                {!props.ticket.data.is_abandoned ? <TicketActions
                    ticket={props.ticket}
                    isInvoiced={props.isInvoiced}
                    setTicketData={props.setTicketData}
                    tickets={[...new Set(props.continuations.data.map(ticket => {
                        return {
                            ticket_id: ticket.id,
                            ticket_type: ticket.data.ticket_type
                        };
                    }))]} 
                    contract={props.contract}
                    engineers={props.engineers}
                    quote={props.quote}
                    department={props.department}
                /> : null}
            </PermsProtectedComponent>
            <TicketAssociatedData
                ticket={props.ticket}
                customer={props.customer}
                site={props.site}
                equipment={props.equipment}
                contract={props.contract}
                contact={props.contact}
                invoiceType={props.invoiceType}
                isComplete={props.ticket.data.completion_date !== null}
                contactsCount={contactsData.total_count}
                setTicketData={props.setTicketData}
            />
            <PermsProtectedComponent requiredPerms={{ accounts: 2 }}>
                <TicketAccounts
                    ticket={props.ticket}
                    isInvoiced={props.isInvoiced}
                    department={props.department}
                    getInterimInvoices={props.getInterimInvoices}
                    getCreditNotes={props.getCreditNotes}
                />
            </PermsProtectedComponent>
            <TicketMaterials 
                ticketID={props.ticket.id}
                ticketType={props.ticket.data.ticket_type}
                ticketNumber={props.ticket.data.number} 
                departmentID={props.ticket.data.department_id} 
                requisitionLineCount={requisitionLinesData.total_count}   
                purchaseOrderCount={purchaseOrderData.total_count}
            />
            <TicketLabour 
                ticketID={props.ticket.id}
                ticketType={props.ticket.data.ticket_type}
                tickets={[...new Set(props.continuations.data.map(ticket => {
                    return {
                        ticket_id: ticket.id,
                        ticket_type: ticket.data.ticket_type
                    }
                }))]} 
                invoiceTimeCount={invoiceTicketTimeData.total_count}
                getInvoiceTicketTime={getInvoiceTicketTime}
            />
            <TicketRefrigerantMovements 
                ticketNumber={props.ticket.data.number} 
                refrigerantMovementCount={refrigerantMovementsData.total_count}
            />
            {props.equipment && serviceTicketsData && maintenanceHistoryData && equipmentRefrigerantMovementData ?
                <TicketEquipmentHistory
                    equipmentID={props.equipment.id}
                    ticketNumbers={serviceTicketsData.data.length > 0 ? [...new Set(serviceTicketsData.data.map(ticket => ticket.data.number))] : [-1]}
                    serviceTotal={serviceTicketsData.total_count}
                    maintenanceTotal={maintenanceHistoryData.total_count}
                    movementCount={equipmentRefrigerantMovementData.total_count}
                /> : null
            }
            <TicketEngineer
                tickets={[...new Set(props.continuations.data.map(ticket => {
                    return {
                        ticket_id: ticket.id,
                        ticket_type: ticket.data.ticket_type
                    }
                }))]}
                continuations={props.continuations.data}
                invoiceTimeCount={invoiceTicketTimeData.total_count}
                reportsCount={props.continuations.data.filter(ticket => ticket.data.is_report_complete).length}
                equipmentDetailsCount={engineerEquipmentDetailsData.total_count}      
                notesCount={notesData.total_count}
                vanStockRequestsCount={vanStockRequestData.total_count}
                departmentName={props.department.data.name}
                siteListNotesCount={siteListNotesData.total_count}
                ticketType={props.ticket.data.ticket_type}
            />
            <PermsProtectedComponent requiredPerms={{ tickets: 2 }}>
                {props.ticket.data.ticket_type === 0 ?
                    <TicketJob 
                        ticketID={props.ticket.id} 
                        ticketType={props.ticket.data.ticket_type}            
                        job={props.job}
                        setTicketData={props.setTicketData}
                    />
                : null}
                <TicketRAMS/>
                {!props.ticket.data.is_abandoned ? <TicketAbandon 
                    ticketID={props.ticket.id} 
                    ticketType={props.ticket.data.ticket_type}
                    setTicketData={props.setTicketData}
                /> : null}
            </PermsProtectedComponent>

            <ExportResource
                resourceName="Ticket"
                resourceData={props.ticket}
            />
        </> :
        <TicketSideBarSkeleton/>
    )
}

export default TicketSideBar