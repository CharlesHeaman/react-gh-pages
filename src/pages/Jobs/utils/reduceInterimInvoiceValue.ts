import { InterimInvoiceResponseData } from "../../../types/interimInvoice.types";

const reduceInterimInvoiceValue = (interimInvoices: Array<InterimInvoiceResponseData>): number => {
    return interimInvoices.reduce((total, invoice) => total + invoice.data.invoice_value, 0)
}

export default reduceInterimInvoiceValue;