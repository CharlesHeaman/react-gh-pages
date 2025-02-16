import { TicketInvoiceRequestResponseData } from "../../../types/TicketInvoiceRequest.types";

const reduceInvoiceRequestCost = (invoiceRequests: Array<TicketInvoiceRequestResponseData>): number => {
    return invoiceRequests.reduce((totalCost, currentInvoiceRequest) => totalCost + (
        currentInvoiceRequest.data.labour_cost + 
        currentInvoiceRequest.data.mileage_cost + 
        currentInvoiceRequest.data.expenses_cost + 
        currentInvoiceRequest.data.material_cost + 
        currentInvoiceRequest.data.sub_contract_cost + 
        currentInvoiceRequest.data.hire_cost
    ), 0);
}

export default reduceInvoiceRequestCost;