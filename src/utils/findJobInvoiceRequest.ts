import { JobInvoiceRequestResponseData } from "../types/JobInvoiceRequest"

const findJobInvoiceRequest = (invoiceRequests: Array<JobInvoiceRequestResponseData>, jobNumber: number, departmentID: number) => {
    return invoiceRequests.find(invoiceRequest => 
        invoiceRequest.data.job_number === jobNumber && 
        invoiceRequest.data.department_id === departmentID
    )
}

export default findJobInvoiceRequest