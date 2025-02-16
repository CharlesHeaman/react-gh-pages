import { CollectionResponse, ResponseData } from "./response.types"

export interface JobInvoiceRequest {
    created_by_id: number,
    processed_by_id: number | null,
    created_at: Date,
    department_id: number,
    job_number: string,
    requested_value: number,
    invoice_value: number,
    is_processed: boolean,
    processed_date: Date,
    invoice_number: string,
    invoice_date: Date,
    labour_cost: number,
    mileage_cost: number,
    expenses_cost: number,
    material_cost: number,
    sub_contract_cost: number,
    hire_cost: number,
    invoice_text: string,
}

export interface JobInvoiceRequestResponseData extends ResponseData {
    id: number,
    data: JobInvoiceRequest
}

export interface  JobInvoiceRequestCollectionResponse extends CollectionResponse {
    data: Array<JobInvoiceRequestResponseData>
}
