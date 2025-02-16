import { TicketResponseData } from "../types/tickets.types";
import { TimegridTicketTimeResponseData } from '../types/timegridTicketTime.types';

const findTicketUserTimegridTicketTime = (timegridTicketTime: Array<TimegridTicketTimeResponseData>, ticket: TicketResponseData, userID: number) => {
    return timegridTicketTime.find(timegridTicketTime => 
        timegridTicketTime.data.ticket_id === ticket.id && 
        timegridTicketTime.data.ticket_type === ticket.data.ticket_type && 
        timegridTicketTime.data.user_id === userID)
}

export default findTicketUserTimegridTicketTime