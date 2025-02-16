import { useEffect, useState } from "react";
import GridItem from "../../../../../../../../../components/ui/Containers/GridItem/GridItem";
import InfoGrid from "../../../../../../../../../components/ui/Containers/InfoGrid/InfoGrid";
import WindowOverlay from "../../../../../../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import NewEquipmentLink from "../../../../../../../../../components/ui/Links/NewEquipmentLink";
import { CustomerResponseData } from "../../../../../../../../../types/customers.types";
import { EquipmentCollectionResponse } from "../../../../../../../../../types/equipment.types";
import { QuoteCollectionResponse } from "../../../../../../../../../types/quote.types";
import { QuotedEquipmentCollectionResponse } from "../../../../../../../../../types/quotedEquipment.types";
import { SiteListNoteCollectionResponse } from "../../../../../../../../../types/siteListNotes.types";
import { SiteCollectionResponse } from "../../../../../../../../../types/sites.types";
import { TicketInvoiceRequestCollectionResponse } from "../../../../../../../../../types/TicketInvoiceRequest.types";
import { TicketCollectionResponse } from "../../../../../../../../../types/tickets.types";
import filterEquipmentQuotedEquipment from "../../../../../../../../../utils/filterEquipmentQuotedEquipment";
import filterEquipmentSiteListNotes from "../../../../../../../../../utils/filterEquipmentSiteListNotes";
import filterEquipmentTickets from "../../../../../../../../../utils/filterEquipmentTickets";
import getAPI from "../../../../../../../../../utils/getAPI";
import EquipmentReportCalloutTickets from "./EquipmentReportCalloutTickets";
import EquipmentReportPlannedMaintenanceTickets from "./EquipmentReportPlannedMaintenanceTickets";
import EquipmentReportQuotes from "./EquipmentReportQuotes";
import NoneFound from "../../../../../../../../../components/ui/General/NoneFound/NoneFound";

const CustomerEquipmentReport = (props: {
    customer: CustomerResponseData,
    show: boolean,
    hideFunc: () => void,
}) => {
    // Data States
    const [isSitesLoading, setIsSiteLoading] = useState(true);
    const [isEquipmentLoading, setIsEquipmentLoading] = useState(false);
    const [equipmentData, setEquipmentData] = useState<EquipmentCollectionResponse>();
    const [isServiceHistoryLoading, setIsServiceHistoryLoading] = useState(true);
    const [serviceTicketsData, setServiceTicketsData] = useState<TicketCollectionResponse>();
    const [isInvoiceRequestsLoading, setIsInvoiceRequestsLoading] = useState(true);
    const [invoiceRequestData, setInvoiceRequestData] = useState<TicketInvoiceRequestCollectionResponse>();
    const [isQuotedEquipmentLoading, setIsQuotedEquipmentLoading] = useState(true);
    const [quotedEquipmentData, setQuotedEquipmentData] = useState<QuotedEquipmentCollectionResponse>();
    const [isQuotesLoading, setIsQuotesLoading] = useState(true);
    const [quoteData, setQuoteData] = useState<QuoteCollectionResponse>();
    const [isSiteListNotesLoading, setIsSiteListNotesLoading] = useState(false);
    const [siteListNotesData, setSiteListNotesData] = useState<SiteListNoteCollectionResponse>();
    const [isPlannedMHistoryLoading, setIsPlannedMHistoryLoading] = useState(true);
    const [plannedMTicketsData, setPlannedMTicketsData] = useState<TicketCollectionResponse>();


    useEffect(() => {
        getSites(props.customer.id);
    }, [props.customer.id])

    const getSites = (customerID: number) => {
        getAPI(`sites`, {
            customer_ids: [customerID],
            is_active: true,
        }, (response: any) => {
            const siteData: SiteCollectionResponse = response.data;
            if (siteData.data.length > 0) {
                getEquipment([...new Set(siteData.data.map(site => site.id))]);
            } else {
                getEquipment([-1]);
            }
        }, setIsSiteLoading);
    }

    const getEquipment = (siteIDs: Array<number>) => {
        getAPI(`equipment`, {
            site_ids: siteIDs,
            is_active: true,
        }, (response: any) => {
            const equipmentData: EquipmentCollectionResponse = response.data;
            setEquipmentData(equipmentData);
            if (equipmentData.data.length > 0) {
                getServiceHistory([...new Set(equipmentData.data.map(equipment => equipment.id))]);
                getQuotedEquipment([...new Set(equipmentData.data.map(equipment => equipment.id))]);
                getSiteListNotes([...new Set(equipmentData.data.map(equipment => equipment.id))]);
            } else {
                getServiceHistory([-1]);
                getQuotedEquipment([-1]);
                getSiteListNotes([-1]);
            }            
        }, setIsEquipmentLoading)    
    } 

    const getServiceHistory = (equipmentIDs: Array<number>) => {
        getAPI(`tickets`, {
            equipment_ids: equipmentIDs,
            ticket_type: 0
        }, (response: any) => {
            const serviceTicketData: TicketCollectionResponse = response.data;
            setServiceTicketsData(serviceTicketData);
            if (serviceTicketData.data.length > 0) {
                getInvoiceRequest([...new Set(serviceTicketData.data.map(ticket => {
                    return {
                        ticket_number: ticket.data.number,
                        department_id: ticket.data.department_id
                    }
                }))]);
            } else {
                getInvoiceRequest([{
                    ticket_number: -1,
                    department_id: -1
                }])
            }
        }, setIsServiceHistoryLoading)    
    } 

    const getQuotedEquipment = (equipmentIDs: Array<number>) => {
        getAPI(`quoted_equipment`, {
            equipment_ids: equipmentIDs,
        }, (response: any) => {
            const quotedEquipmentData: QuotedEquipmentCollectionResponse = response.data;
            setQuotedEquipmentData(quotedEquipmentData);
            if (quotedEquipmentData.data.length > 0) {
                getQuotes([...new Set(quotedEquipmentData.data.map(quotedEquipment => quotedEquipment.data.quote_id))]);
            } else {
                getQuotes([-1]);
            }   
        }, setIsQuotedEquipmentLoading)    
    } 

    const getQuotes = (quoteIDs: Array<number>) => {
        getAPI(`quotes`, {
            ids: quoteIDs,
        }, (response: any) => {
            const quoteData: QuoteCollectionResponse = response.data;
            setQuoteData(quoteData);
        }, setIsQuotesLoading)    
    } 

    const getInvoiceRequest = (numberTickets: Array<any>) => {
        getAPI(`ticket_invoice_requests`, {
            tickets: numberTickets
        }, (response: any) => {
            const invoiceRequests: TicketInvoiceRequestCollectionResponse = response.data;
            setInvoiceRequestData(invoiceRequests);
        }, setIsInvoiceRequestsLoading);
    }

    const getSiteListNotes = (equipmentIDs: Array<number>) => {
        getAPI(`site_list_notes`, {
            equipment_ids: equipmentIDs,
        }, (response: any) => {
            const siteListNotesData: SiteListNoteCollectionResponse = response.data;
            setSiteListNotesData(siteListNotesData);
            getPlannedMHistory([...new Set(siteListNotesData.data.map(quotedEquipment => {
                return {
                    ticket_id: quotedEquipment.data.ticket_id,
                    ticket_type: 1,
                }
            }))]);
        }, setIsSiteListNotesLoading)    
    } 

    const getPlannedMHistory = (tickets: Array<any>) => {
        getAPI(`tickets`, {
            tickets: tickets,
            ticket_type: 1
        }, (response: any) => {
            const plannedMTicketData: TicketCollectionResponse = response.data;
            setPlannedMTicketsData(plannedMTicketData);
        }, setIsPlannedMHistoryLoading)    
    } 

    return (
        <WindowOverlay 
            title={"Customer Equipment Report"} 
            maxWidth={1400} 
            show={props.show}
            hideFunc={props.hideFunc} 
        >
            {equipmentData && serviceTicketsData && invoiceRequestData && siteListNotesData && plannedMTicketsData && quoteData && quotedEquipmentData &&
                equipmentData.data.length > 0 ?
                equipmentData.data.map((equipment, index) => 
                    <div key={index}>
                        <InfoGrid>
                            <GridItem>
                                <h2><NewEquipmentLink code={equipment.data.code}/></h2>
                            </GridItem>
                            <GridItem title='Location' span={3}>
                                <p>{equipment.data.location}</p>
                            </GridItem>
                            <GridItem title='Description' span={3}>
                                <p>{equipment.data.description}</p>
                            </GridItem>
                            <GridItem title='Callout Tickets'>
                                <EquipmentReportCalloutTickets
                                    tickets={filterEquipmentTickets(serviceTicketsData.data, equipment.id)}
                                    invoiceRequests={invoiceRequestData}
                                />
                            </GridItem>
                            <GridItem title='Planned Maintenance Visits' span={2}>
                                <EquipmentReportPlannedMaintenanceTickets
                                    tickets={plannedMTicketsData.data}                                
                                    siteListNotes={filterEquipmentSiteListNotes(siteListNotesData.data, equipment.id)}
                                />
                            </GridItem>
                            <GridItem title='Quotes'>
                                <EquipmentReportQuotes
                                    quotedEquipment={filterEquipmentQuotedEquipment(quotedEquipmentData.data, equipment.id)}
                                    quotes={quoteData.data}
                                />
                            </GridItem>
                        </InfoGrid>
                        <hr/>
                    </div>
                ) :
                <NoneFound 
                    iconFont="local_laundry_service" 
                    text={"No equipment found"}
                />
            }
        </WindowOverlay>
    )
}

export default CustomerEquipmentReport