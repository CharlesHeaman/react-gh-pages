import { TicketResponseData } from './../../../types/tickets.types';

const filterSuffixTickets = (tickets: Array<TicketResponseData>, suffix: number): Array<TicketResponseData> => {
    return tickets.filter(ticket =>  ticket.data.suffix === suffix)
}

export default filterSuffixTickets