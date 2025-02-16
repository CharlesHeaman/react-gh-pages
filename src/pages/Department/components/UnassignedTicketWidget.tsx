import { useEffect, useState } from "react";
import DashboardWidget from "../../../components/ui/DashboardWidget/DashboardWidget";
import { TicketCollectionResponse } from "../../../types/tickets.types";
import getAPI from "../../../utils/getAPI";

const UnassignedTicketWidget = (props: {
    departmentID?: number | null,
}) => {
    // Data States
    const [isTicketsLoading, setIsTicketsLoading] = useState(false);
    const [ticketData, setTicketsData] = useState<TicketCollectionResponse>();

    useEffect(() => {
        if (props.departmentID === undefined) return
        getTickets();
    }, [props.departmentID]);

    const getTickets = () => {
        getAPI('tickets', {
            department_ids: props.departmentID ? [props.departmentID] : undefined,
            is_unassigned: true,
            has_completion_date: false,
            perPage: 1
        }, (response: any) => {
            const ticketData: TicketCollectionResponse = response.data;
            setTicketsData(ticketData);
        }, setIsTicketsLoading);
    }

    return (
        <DashboardWidget 
            title="Tickets"
            count={ticketData?.total_count}
            text="Without assignment." 
            iconFont={"person_off"}
            to={`tickets?ticket_list_type=0`}
            negative
        />
    )
}

export default UnassignedTicketWidget;