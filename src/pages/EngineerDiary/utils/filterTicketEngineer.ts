import { TicketResponseData } from './../../../types/tickets.types';

const filterTicketEngineer = (tickets: Array<TicketResponseData>, engineerID: number): Array<TicketResponseData> => {
    return tickets.filter(ticket => ticket.data.engineers.filter(engineer => engineer.user_id === engineerID).length > 0)
}

export default filterTicketEngineer