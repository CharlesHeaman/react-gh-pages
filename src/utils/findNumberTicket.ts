import { TicketResponseData } from "../types/tickets.types";

const findNumberTicket = (tickets: Array<TicketResponseData>, ticketNumber: number, ticketType: number, departmentID: number): TicketResponseData | undefined => {
    return tickets.find(ticket => 
        ticket.data.ticket_type === ticketType && 
        ticket.data.department_id === departmentID && 
        ticket.data.number === ticketNumber
    )
}

export default findNumberTicket