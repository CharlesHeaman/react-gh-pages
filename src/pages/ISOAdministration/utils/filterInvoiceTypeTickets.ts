import { TicketResponseData } from './../../../types/tickets.types';

const filterInvoiceTypeTickets = (tickets: Array<TicketResponseData>, invoiceType: number): Array<TicketResponseData> => {
    return tickets.filter(ticket =>  ticket.data.invoice_type === invoiceType)
}

export default filterInvoiceTypeTickets