import { CollectionResponse, ResponseData } from "./response.types"

export interface JobInvoiceRequestActivity {
    job_invoice_request_id: number,
    type: number,
    created_at: Date,
    created_by_id: number,
}

export interface JobInvoiceRequestActivityResponseData extends ResponseData {
    id: number
    data: JobInvoiceRequestActivity
}

export interface  JobInvoiceRequestActivityCollectionResponse extends CollectionResponse {
    data: Array<JobInvoiceRequestActivityResponseData>
}

export interface CreateJobInvoiceRequestActivityAttributes {
    notes: string
}