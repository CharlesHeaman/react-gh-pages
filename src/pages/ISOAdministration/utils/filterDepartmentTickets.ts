import { TicketResponseData } from './../../../types/tickets.types';

const filterDepartmentTickets = (tickets: Array<TicketResponseData>, departmentID: number): Array<TicketResponseData> => {
    return tickets.filter(ticket => ticket.data.department_id === departmentID)
}

export default filterDepartmentTickets