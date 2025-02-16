import { TicketInvoiceRequestResponseData } from './../types/TicketInvoiceRequest.types';

const findTicketInvoiceRequest = (invoiceRequests: Array<TicketInvoiceRequestResponseData>, ticketNumber: number, departmentID: number) => {
    return invoiceRequests.find(invoiceRequest => 
        invoiceRequest.data.ticket_number === ticketNumber && 
        invoiceRequest.data.department_id === departmentID
    )
}

export default findTicketInvoiceRequest