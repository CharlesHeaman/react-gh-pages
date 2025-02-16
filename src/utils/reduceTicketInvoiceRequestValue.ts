import { TicketInvoiceRequestResponseData } from "../types/TicketInvoiceRequest.types"

const reduceTicketInvoiceRequestValue = (invoiceRequests: Array<TicketInvoiceRequestResponseData>): number => {
    return invoiceRequests.reduce((value: number, invoiceRequest) => {
        return value + invoiceRequest.data.invoice_value
    }, 0)
}

export default reduceTicketInvoiceRequestValue