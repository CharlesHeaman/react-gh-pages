import { TimegridTicketTimeResponseData } from '../types/timegridTicketTime.types';
import { TicketResponseData } from '../types/tickets.types';

const filterTicketsUserTimegridTicketTime = (timegridTicketTime: Array<TimegridTicketTimeResponseData>, tickets: Array<TicketResponseData>, userID: number) => {
    return timegridTicketTime.filter(timegridTicketTime => 
        tickets.find(ticket => 
            timegridTicketTime.data.ticket_id === ticket.id && 
            timegridTicketTime.data.ticket_type === ticket.data.ticket_type
        ) && 
        timegridTicketTime.data.user_id === userID)
}

export default filterTicketsUserTimegridTicketTime