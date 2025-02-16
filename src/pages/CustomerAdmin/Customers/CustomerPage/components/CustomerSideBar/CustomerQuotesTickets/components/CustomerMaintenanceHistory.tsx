import { useEffect, useState } from "react";
import WindowOverlay from "../../../../../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import { TicketCollectionResponse } from "../../../../../../../../types/tickets.types";
import getAPI from "../../../../../../../../utils/getAPI";
import TicketList from "../../../../../../../Tickets/components/TicketList";
import TicketSearchHeader from "../../../../../../../Tickets/components/TicketSearchHeader";

const CustomerMaintenanceHistory = (props: {
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
            suffixes: [0],
            ticket_type: 1,
        }, (response: any) => {
            const ticketData: TicketCollectionResponse = response.data;
            setTicketData(ticketData);
        }, setIsTicketsLoading)    
    } 

    return (
        <>
            <WindowOverlay
                title='Customer Maintenance Ticket History'
                show={props.show}
                hideFunc={props.hideFunc}
                maxWidth={400}
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

export default CustomerMaintenanceHistory