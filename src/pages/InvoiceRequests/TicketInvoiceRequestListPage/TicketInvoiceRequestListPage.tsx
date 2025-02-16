import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import OuterContainer from "../../../components/ui/Containers/OuterContainer/OuterContainer";
import { TicketInvoiceRequestCollectionResponse } from "../../../types/TicketInvoiceRequest.types";
import getAPI from "../../../utils/getAPI";
import InvoiceRequestNavigation from "../components/InvoiceRequestNavigation";
import TicketInvoiceRequestAdvancedSearch from "../TicketInvoiceRequestPage/components/TicketInvoiceRequestAdvancedSearch";
import TicketInvoiceRequestList from "./components/TicketInvoiceRequestList";
import TicketInvoiceRequestSearchHeader from "./components/TicketInvoiceRequestSearchHeader";
import getTicketInvoiceRequestSearchParams from "./utils/getTicketInvoiceRequestSearchParams";

const TicketInvoiceRequestListPage = ()  => {
    const [searchParams] = useSearchParams();

    // Search States
    const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);

    // Data States
    const [isTicketInvoiceRequestsLoading, setIsTicketInvoiceRequestsLoading] = useState(true);
    const [ticketInvoiceRequestsData, setTicketInvoiceRequestsData] = useState<TicketInvoiceRequestCollectionResponse>();

    // Search Parameters 
    const ticketInvoiceRequestSearchParams = getTicketInvoiceRequestSearchParams(searchParams);
    
    useEffect(() => {
        searchTicketInvoiceRequests();
    }, [JSON.stringify(ticketInvoiceRequestSearchParams)])

    const searchTicketInvoiceRequests = () => {
        setShowAdvancedSearch(false);
        getAPI('ticket_invoice_requests', ticketInvoiceRequestSearchParams, (response: any) => {
            const ticketInvoiceRequestData: TicketInvoiceRequestCollectionResponse = response.data;
            setTicketInvoiceRequestsData(ticketInvoiceRequestData);
        }, setIsTicketInvoiceRequestsLoading);
    }

    return (
        <>
            <InvoiceRequestNavigation location="tickets"/>
            <OuterContainer
                title='Ticket Invoice Requests'
                description="Process invoice requests raised for tickets."
                maxWidth={1600}
                noBorder
            >
                <TicketInvoiceRequestSearchHeader
                    showAdvancedSearch={() => setShowAdvancedSearch(true)}
                />
                <TicketInvoiceRequestList 
                    isTicketInvoiceRequestsLoading={isTicketInvoiceRequestsLoading} 
                    ticketInvoiceRequests={ticketInvoiceRequestsData} 
                    perPage={ticketInvoiceRequestSearchParams.perPage}                
                />
            </OuterContainer>

            <TicketInvoiceRequestAdvancedSearch
                show={showAdvancedSearch}
                hideFunc={() => setShowAdvancedSearch(false)}
            />
        </>
    )
}

export default TicketInvoiceRequestListPage