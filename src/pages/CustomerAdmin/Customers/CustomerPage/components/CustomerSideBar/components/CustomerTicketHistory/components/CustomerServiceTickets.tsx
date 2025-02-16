import { useEffect, useState } from "react";
import WindowOverlay from "../../../../../../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import { TicketCollectionResponse } from "../../../../../../../../../types/tickets.types";
import getAPI from "../../../../../../../../../utils/getAPI";
import TicketList from "../../../../../../../../Tickets/components/TicketList";

const CustomerServiceTickets = (props: {
    customerID: number,
    totalCount: number,
    show: boolean,
    hideFunc: () => void,
}) => {
    // Data States
    const [isServiceHistoryLoading, setIsServiceHistoryLoading] = useState(true);
    const [serviceTicketsData, setServiceTicketsData] = useState<TicketCollectionResponse>();
    
    useEffect(() => {
        getServiceHistory();
    }, [props.customerID])

    const getServiceHistory = () => {
        getAPI(`tickets`, {
            customer_ids: [props.customerID],
            ticket_type: 0
        }, (response: any) => {
            const serviceTicketData: TicketCollectionResponse = response.data;
            setServiceTicketsData(serviceTicketData);
        }, setIsServiceHistoryLoading)    
    } 

    return (
        <>
            <WindowOverlay
                title='Customer Service Ticket History'
                show={props.show}
                hideFunc={props.hideFunc}
                maxWidth={400}
            >
                <TicketList 
                    isTicketsLoading={isServiceHistoryLoading} 
                    tickets={serviceTicketsData} 
                />
            </WindowOverlay>
        </>
    )
}

export default CustomerServiceTickets