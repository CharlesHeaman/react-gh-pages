import { CollectionResponse, ResponseData } from "./response.types"

export interface InterimInvoice {
    created_by_id: number,
    department_id: number,
    job_number: number,
    invoice_number: string,
    invoice_date: Date,
    invoice_value: number,
    notes: string | null
}

export interface InterimInvoiceResponseData extends ResponseData {
    id: number,
    data: InterimInvoice
}

export interface  InterimInvoiceCollectionResponse extends CollectionResponse {
    data: Array<InterimInvoiceResponseData>
}