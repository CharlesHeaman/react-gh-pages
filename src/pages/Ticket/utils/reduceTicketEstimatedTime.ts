import { TicketResponseData } from "../../../types/tickets.types";

const reduceTicketEstimatedTime = (tickets: Array<TicketResponseData>) => {
    return tickets.reduce((estimatedTime, ticket) => estimatedTime + ticket.data.estimated_time, 0);
}

export default reduceTicketEstimatedTime