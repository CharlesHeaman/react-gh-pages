import { TicketInvoiceRequestResponseData } from "../../../types/TicketInvoiceRequest.types";

const reduceInvoiceValue = (invoiceRequests: Array<TicketInvoiceRequestResponseData>): number => {
    return invoiceRequests.reduce((totalCost, currentInvoiceRequest) => totalCost + currentInvoiceRequest.data.invoice_value, 0);
}

export default reduceInvoiceValue;