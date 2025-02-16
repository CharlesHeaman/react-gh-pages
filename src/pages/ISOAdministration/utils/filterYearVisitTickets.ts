import { TicketResponseData } from './../../../types/tickets.types';

const filterYearVisitTickets = (tickets: Array<TicketResponseData>, year: number): Array<TicketResponseData> => {
    return tickets.filter(ticket =>  new Date(ticket.data.visit_date).getFullYear() === year)
}

export default filterYearVisitTickets