import { useEffect, useState } from "react";
import WindowOverlay from "../../../../../../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import { TicketCollectionResponse } from "../../../../../../../../../types/tickets.types";
import getAPI from "../../../../../../../../../utils/getAPI";
import TicketList from "../../../../../../../../Tickets/components/TicketList";
import TicketSearchHeader from "../../../../../../../../Tickets/components/TicketSearchHeader";

const SiteOpenServiceTickets = (props: {
    siteID: number,
    totalCount: number,
    show: boolean,
    hideFunc: () => void,
}) => {
    // Search States
    const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);

    // Data States
    const [isTicketsLoading, setIsTicketsLoading] = useState(true);
    const [ticketData, setTicketData] = useState<TicketCollectionResponse>();
    
    useEffect(() => {
        getTickets();
    }, [props.siteID])

    const getTickets = () => {
        getAPI(`tickets`, {
            site_id: props.siteID,
            is_invoice_requested: false,
            suffixes: [0],
            ticket_type: 0,
        }, (response: any) => {
            const ticketData: TicketCollectionResponse = response.data;
            setTicketData(ticketData);
        }, setIsTicketsLoading)    
    } 

    return (
        <>
            <WindowOverlay
                title='Site Open Service Tickets'
                show={props.show}
                hideFunc={props.hideFunc}
                maxWidth={1200}
                top
            >
                <TicketSearchHeader
                    showAdvancedSearch={() => setShowAdvancedSearch(true)}
                    siteID={props.siteID}
                />
                <TicketList 
                    isTicketsLoading={isTicketsLoading} 
                    tickets={ticketData} 
                />
            </WindowOverlay>
        </>
    )
}

export default SiteOpenServiceTickets