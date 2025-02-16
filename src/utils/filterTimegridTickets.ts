import { TicketResponseData } from "../types/tickets.types"
import { TimegridResponseData } from "../types/timegrid.types"
import isSameDay from "./isSameData"

const filterTimegridTickets = (tickets: Array<TicketResponseData>, timegrid: TimegridResponseData) => {
    return tickets.filter(ticket => 
        isSameDay(new Date(ticket.data.visit_date), new Date(timegrid.data.date)) && 
        ticket.data.engineers.find(engineer => engineer.user_id === timegrid.data.user_id)
    )
}

export default filterTimegridTickets