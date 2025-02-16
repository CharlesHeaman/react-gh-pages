import { useEffect, useState } from "react";
import DashboardWidget from "../../../components/ui/DashboardWidget/DashboardWidget";
import { TicketCollectionResponse } from "../../../types/tickets.types";
import getAPI from "../../../utils/getAPI";

const RAMSRequiredTicketWidget = (props: {
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
            // suffixes: [0],
            is_rams_required: true,
            is_rams_uploaded: false,
            has_completion_date: false,
            perPage: 1
        }, (response: any) => {
            const ticketData: TicketCollectionResponse = response.data;
            setTicketsData(ticketData);
        }, setIsTicketsLoading);
    }

    return (
        <DashboardWidget 
            title="RAMS"
            count={ticketData?.total_count}
            text="Tickets requiring RAMS." 
            iconFont={"assignment_late"}
            to="tickets?ticket_list_type=3"
            negative
        />
    )
}

export default RAMSRequiredTicketWidget;