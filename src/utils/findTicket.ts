import { TicketResponseData } from "../types/tickets.types";

const findTicket = (tickets: Array<TicketResponseData>, ticketID: number, ticketType: number): TicketResponseData | undefined => {
    return tickets.find(ticket => 
        ticket.id === ticketID && 
        ticket.data.ticket_type === ticketType
    )
}

export default findTicket