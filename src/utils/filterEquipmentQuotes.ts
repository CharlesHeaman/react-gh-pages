import { QuoteResponseData } from '../types/quote.types';
import { TicketResponseData } from '../types/tickets.types';

const filterEquipmentTickets = (quotes: Array<QuoteResponseData>, equipment: number): Array<TicketResponseData> => {
    return quotes.filter(contract => contract.data.equipment_id === equipment)
}

export default filterEquipmentTickets