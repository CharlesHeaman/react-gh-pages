import { TicketResponseData } from "../../../types/tickets.types";
import filterSuffixTickets from "../utils/filterSuffixTickets";

const CalloutPerformanceRowYear = (props: {
    tickets: Array<TicketResponseData>,
}) => {
    const continuationCount = filterSuffixTickets(props.tickets, 1).length;
    const totalTicketCount = filterSuffixTickets(props.tickets, 0).length;
    const firstCompleteCount = totalTicketCount - continuationCount;
    return (
        <>
            {Math.round((firstCompleteCount / totalTicketCount) * 100)}% ({firstCompleteCount}/{totalTicketCount})
        </>
    )
}

export default CalloutPerformanceRowYear