import isSameDay from '../../../utils/isSameData';
import { TicketResponseData } from './../../../types/tickets.types';

const filterTicketVisitDate = (tickets: Array<TicketResponseData>, visitDate: Date): Array<TicketResponseData> => {
    return tickets.filter(ticket => isSameDay(new Date(ticket.data.visit_date), visitDate))
}

export default filterTicketVisitDate