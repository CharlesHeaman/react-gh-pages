import { useEffect, useState } from "react";
import WindowOverlay from "../../../../../../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import { TicketCollectionResponse } from "../../../../../../../../../types/tickets.types";
import getAPI from "../../../../../../../../../utils/getAPI";
import TicketList from "../../../../../../../../Tickets/components/TicketList";

const SiteServiceTickets = (props: {
    siteID: number,
    totalCount: number,
    show: boolean,
    hideFunc: () => void,
}) => {
    // Data States
    const [isTicketsLoading, setIsTicketsLoading] = useState(true);
    const [ticketData, setTicketData] = useState<TicketCollectionResponse>();
    
    useEffect(() => {
        getService();
    }, [props.siteID])

    const getService = () => {
        getAPI(`tickets`, {
            site_id: props.siteID,
            ticket_type: 0
        }, (response: any) => {
            const ticketData: TicketCollectionResponse = response.data;
            setTicketData(ticketData);
        }, setIsTicketsLoading)    
    } 

    return (
        <>
            <WindowOverlay
                title='Site Service Ticket History'
                show={props.show}
                hideFunc={props.hideFunc}
                maxWidth={1200}
                top
            >
                <TicketList 
                    isTicketsLoading={isTicketsLoading} 
                    tickets={ticketData} 
                />
            </WindowOverlay>
        </>
    )
}

export default SiteServiceTickets