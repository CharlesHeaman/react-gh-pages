import { useEffect, useState } from "react";
import WindowOverlay from "../../../../../../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import { TicketCollectionResponse } from "../../../../../../../../../types/tickets.types";
import getAPI from "../../../../../../../../../utils/getAPI";
import TicketList from "../../../../../../../../Tickets/components/TicketList";
import { useSearchParams } from "react-router-dom";
import getTicketSearchParams from "../../../../../../../../DepartmentTickets/components/getTicketSearchParams";

const CustomerMaintenanceTickets = (props: {
    customerID: number,
    totalCount: number,
    show: boolean,
    hideFunc: () => void,
}) => {
    const [searchParams] = useSearchParams();
    
    // Data States
    const [isMaintenanceHistoryLoading, setIsMaintenanceHistoryLoading] = useState(true);
    const [serviceTicketsData, setMaintenanceTicketsData] = useState<TicketCollectionResponse>();

    // Search Parameters
    const ticketSearchParams = getTicketSearchParams(searchParams);
    
    useEffect(() => {
        getMaintenanceHistory();
    }, [JSON.stringify(ticketSearchParams), props.customerID])

    const getMaintenanceHistory = () => {
        getAPI(`tickets`, {
            ...ticketSearchParams,
            customer_ids: [props.customerID],
            ticket_type: 1
        }, (response: any) => {
            const serviceTicketData: TicketCollectionResponse = response.data;
            setMaintenanceTicketsData(serviceTicketData);
        }, setIsMaintenanceHistoryLoading)    
    } 

    return (
        <>
            <WindowOverlay
                title='Customer Maintenance Ticket History'
                show={props.show}
                hideFunc={props.hideFunc}
                maxWidth={1600}
                top
            >
                <TicketList 
                    isTicketsLoading={isMaintenanceHistoryLoading} 
                    tickets={serviceTicketsData} 
                />
            </WindowOverlay>
        </>
    )
}

export default CustomerMaintenanceTickets