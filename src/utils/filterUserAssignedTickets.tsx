import { TicketResponseData } from "../types/tickets.types"

const filterUserAssignedTickets = (tickets: Array<TicketResponseData>, userID: number) => {
    return tickets.filter(ticket => ticket.data.engineers.find(engineer => engineer.user_id === userID))
} 

export default filterUserAssignedTickets