import { useEffect, useState } from "react";
import WindowOverlay from "../../../../../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import { TicketCollectionResponse } from "../../../../../../../../types/tickets.types";
import getAPI from "../../../../../../../../utils/getAPI";
import TicketList from "../../../../../../../Tickets/components/TicketList";
import TicketSearchHeader from "../../../../../../../Tickets/components/TicketSearchHeader";

const CustomerOpenServiceTickets = (props: {
    customerID: number,
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
    }, [props.customerID])

    const getTickets = () => {
        getAPI(`tickets`, {
            customer_ids: [props.customerID],
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
                title='Customer Open Service Tickets'
                show={props.show}
                hideFunc={props.hideFunc}
                maxWidth={1600}
                top
            >
                <TicketSearchHeader 
                    showAdvancedSearch={() => setShowAdvancedSearch(true)}                
                    customerID={props.customerID}
                />
                <TicketList 
                    isTicketsLoading={isTicketsLoading} 
                    tickets={ticketData} 
                />
            </WindowOverlay>
        </>
    )
}

export default CustomerOpenServiceTickets