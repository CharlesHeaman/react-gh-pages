import { TicketInvoiceRequestResponseData } from '../types/TicketInvoiceRequest.types';

const filterTicketsTicketInvoiceRequests = (ticketInvoiceRequests: Array<TicketInvoiceRequestResponseData>, invoiceRequestIDs: Array<number | undefined>): Array<TicketInvoiceRequestResponseData> => {
    return ticketInvoiceRequests.filter(invoiceRequest => invoiceRequestIDs.includes(invoiceRequest.id))
}

export default filterTicketsTicketInvoiceRequests