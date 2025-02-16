import { useEffect, useState } from "react";
import DashboardWidget from "../../../components/ui/DashboardWidget/DashboardWidget";
import { TicketCollectionResponse } from "../../../types/tickets.types";
import getAPI from "../../../utils/getAPI";

const FurtherActionRequiredTicketWidget = (props: {
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
            is_further_work_required: true,
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
            text="Requiring further action." 
            iconFont={"request_quote"}
            to="tickets?ticket_list_type=1"
            negative
        />
    )
}

export default FurtherActionRequiredTicketWidget;