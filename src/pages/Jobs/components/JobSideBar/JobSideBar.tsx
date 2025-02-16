import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { DepartmentResponseData } from "../../../../types/department.types";
import { EngineerEquipmentDetailsCollectionResponse } from "../../../../types/engineerEquipmentDetails.types";
import { InvoiceTicketTimeCollectionResponse } from "../../../../types/invoiceTicketTime.types";
import { QuoteResponseData } from "../../../../types/quote.types";
import { RequisitionCollectionResponse } from "../../../../types/requisition.types";
import { RequisitionLineCollectionResponse } from "../../../../types/requisitionLines.types";
import { StoresNotificationCollectionResponse } from "../../../../types/storesNotifications.types";
import { TicketNoteCollectionResponse } from "../../../../types/ticketNotes.types";
import { TicketCollectionResponse } from "../../../../types/tickets.types";
import { TicketUploadCollectionResponse } from "../../../../types/ticketUploads.types";
import getAPI from "../../../../utils/getAPI";
import TicketEngineer from "../../../Ticket/TicketPage/components/TicketSideBar/components/TicketEngineer/TicketEngineer";
import JobActions from "./components/JobActions/JobActions";
import JobAssociatedData from "./components/JobAssociatedData/JobAssociatedData";
import JobMaterials from "./components/JobMaterials/JobMaterials";
import JobSideBarSkeleton from "./components/JobSideBarSkeleton";
import { PurchaseOrderCollectionResponse } from "../../../../types/purchaseOrder.types";
import JobAccounts from "./components/JobAccounts/JobAccounts";
import QuoteUploads from "../../../Quotes/components/QuoteSideBar/QuoteUploads";
import ExportResource from "../../../CustomerAdmin/Contacts/ContactPage/components/ContactSideBar/components/ContactDeactivate/ExportResource";
import PermsProtectedComponent from "../../../../components/PermsProtectedComponent";

const JobSideBar = (props: {
    job: QuoteResponseData | undefined,
    setJobData: Dispatch<SetStateAction<QuoteResponseData | undefined>>,
    department: DepartmentResponseData | undefined,
    getInterimInvoices: (departmentID: number) => void,
}) => {
    // Data States 
    const [isTicketsLoading, setIsTicketsLoading] = useState(true);
    const [ticketData, setTicketData] = useState<TicketCollectionResponse>();
    const [isJobRequisitionsLoading, setIsJobRequisitionsLoading] = useState(true);
    const [jobRequisitionNumbers, setJobRequisitionNumbers] = useState<Array<number>>([]);
    const [isTicketRequisitionsLoading, setIsTicketRequisitionsLoading] = useState(true);
    const [ticketRequisitionNumbers, setTicketRequisitionNumbers] = useState<Array<number>>([]);
    const [isRequisitionLinesLoading, setIsRequisitionLinesLoading] = useState(true);
    const [requisitionLinesData, setRequisitionLinesData] = useState<RequisitionLineCollectionResponse>();
    const [isPurchaseOrdersLoading, setIsPurchaseOrdersLoading] = useState(true);
    const [purchaseOrderData, setPurchaseOrderData] = useState<PurchaseOrderCollectionResponse>();
    const [isInvoiceTicketTimeLoading, setIsInvoiceTicketTimeLoading] = useState(true);
    const [invoiceTicketTimeData, setInvoiceTicketTimeData] = useState<InvoiceTicketTimeCollectionResponse>();
    const [isNotesLoading, setIsNotesLoading] = useState(false);
    const [notesData, setNotesData] = useState<TicketNoteCollectionResponse>();
    const [isEngineerEquipmentDetailsLoading, setIsEngineerEquipmentDetailsLoading] = useState(true);
    const [engineerEquipmentDetailsData, setEngineerEquipmentDetailsData] = useState<EngineerEquipmentDetailsCollectionResponse>();
    const [isUploadsLoading, setIsUploadsLoading] = useState(true);
    const [uploadData, setUploadData] = useState<TicketUploadCollectionResponse>();
    const [isVanStockRequestLoading, setIsVanStockRequestLoading] = useState(true);
    const [vanStockRequestData, setVanStockRequestData] = useState<StoresNotificationCollectionResponse>();

    useEffect(() => {
        getTickets();
        getJobRequisitions();
        getPurchaseOrders();
    }, [props.job]);

    useEffect(() => {
        const allRequisitionNumbers = jobRequisitionNumbers.concat(ticketRequisitionNumbers);
        if (allRequisitionNumbers.length > 0) {
            getRequisitionLines([...new Set(allRequisitionNumbers)]);
        } else {
            getRequisitionLines([-1]);
        }
    }, [jobRequisitionNumbers, ticketRequisitionNumbers]);

    const getTickets = () => {
        if (!props.job) return;
        getAPI('tickets', {
            job_number: props.job.data.number
        }, (response: any) => {
            const ticketData: TicketCollectionResponse = response.data;
            setTicketData(ticketData);
            const jobTickets = [...new Set(ticketData.data.map(ticket => {
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
            getInvoiceTicketTime(jobTickets);
            getEngineerEquipmentDetails(jobTickets);
            getTicketUploads(jobTickets);
            getTicketNotes(jobTickets);
            getVanStockRequests(jobTickets);
            getTicketRequisitions(jobDepartmentTickets);
        }, setIsTicketsLoading)
    }

    const getJobRequisitions = () => {
        if (!props.job) return;
        getAPI('requisitions', {
            jobs: [{
                department_id: props.job.data.department_id,
                job_number: props.job.data.number
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

    const getPurchaseOrders = () => {
        if (!props.job) return;
        getAPI('purchase_orders', {
            jobs: [{
                department_id: props.job.data.department_id,
                job_number: props.job.data.number
            }],
            perPage: 1
        }, (response: any) => {
            const purchaseOrderData: PurchaseOrderCollectionResponse = response.data;
            setPurchaseOrderData(purchaseOrderData);
        }, setIsPurchaseOrdersLoading)
    }

    const getRequisitionLines = (requisitionNumber: Array<number>) => {
        getAPI('requisition_lines', {
            req_no: requisitionNumber,
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

    const getTicketUploads = (tickets: Array<any>) => {
        getAPI('ticket_uploads', {
            tickets: tickets,
            perPage: 1
        }, (response: any) => {
            const uploadsData: TicketUploadCollectionResponse = response.data;
            setUploadData(uploadsData);
        }, setIsUploadsLoading)
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

    const isLoading = (
        isJobRequisitionsLoading || 
        isRequisitionLinesLoading ||
        isJobRequisitionsLoading ||
        isTicketRequisitionsLoading ||
        isTicketsLoading || 
        isInvoiceTicketTimeLoading || 
        isNotesLoading || 
        isEngineerEquipmentDetailsLoading || 
        isUploadsLoading || 
        isVanStockRequestLoading ||
        isPurchaseOrdersLoading
    )

    return (
        !isLoading && props.job && props.department && requisitionLinesData && purchaseOrderData && ticketData && invoiceTicketTimeData && engineerEquipmentDetailsData && notesData && uploadData && vanStockRequestData ? <>
            <PermsProtectedComponent requiredPerms={{ quotes: 2 }}>                
                <JobActions 
                    job={props.job} 
                    isInvoiced={false} 
                    setJobData={props.setJobData} 
                />
            </PermsProtectedComponent>
            <PermsProtectedComponent requiredPerms={{ accounts: 2 }}>
                <JobAccounts
                    job={props.job} 
                    isInvoiced={false} 
                    department={props.department}
                    getInterimInvoices={props.getInterimInvoices}
                />
            </PermsProtectedComponent>
            <JobAssociatedData
                job={props.job}
                departmentName={props.department.data.name}
                ticketCount={ticketData.total_count}
            />
            <JobMaterials
                jobID={props.job.id}
                jobNumber={parseInt(props.job.data.number)} 
                departmentID={props.job.data.department_id} 
                requisitionLineCount={requisitionLinesData.total_count}   
                purchaseOrderCount={purchaseOrderData.total_count}
                tickets={[...new Set(ticketData.data.map(ticket => {
                    return {
                        department_id: ticket.data.department_id,
                        ticket_number: ticket.data.number
                    }
                }))]}
            />
            <TicketEngineer
                tickets={[...new Set(ticketData.data.map(ticket => {
                    return {
                        ticket_id: ticket.id,
                        ticket_type: ticket.data.ticket_type
                    }
                }))]}
                invoiceTimeCount={invoiceTicketTimeData.total_count}
                reportsCount={ticketData.data.filter(ticket => ticket.data.is_report_complete).length}
                equipmentDetailsCount={engineerEquipmentDetailsData.total_count}      
                notesCount={notesData.total_count}
                uploadCount={uploadData.total_count}
                vanStockRequestsCount={vanStockRequestData.total_count}
                departmentName={props.department.data.name}
            />
            <ExportResource
                resourceData={props.job}
                resourceName='Job'
            />
        </> :
        <JobSideBarSkeleton/>
    )
}

export default JobSideBar