import { InvoiceTicketTimeResponseData } from "../../../types/invoiceTicketTime.types"

const reduceEngineerTimeExpenses = (engineerTime: Array<InvoiceTicketTimeResponseData>): number => {
    return engineerTime.reduce((totalExpenses, invoiceTime) => totalExpenses + invoiceTime.data.expenses, 0)
}

export default reduceEngineerTimeExpenses