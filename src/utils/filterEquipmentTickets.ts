import { TicketResponseData } from '../types/tickets.types';

const filterEquipmentTickets = (tickets: Array<TicketResponseData>, equipment: number): Array<TicketResponseData> => {
    return tickets.filter(contract => contract.data.equipment_id === equipment)
}

export default filterEquipmentTickets