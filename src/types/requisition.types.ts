import { CollectionResponse, ResponseData } from "./response.types"

export interface Requisition {
    created_at: Date,
    created_by_id: number,
    number: number,
    recipient_id: number,
    cost_centre_id: number,
    notes: string | null,
    customer_id: number | null,
    user_id: number | null,
    vehicle_id: number | null,
    job_number: number | null,
    ticket_number: number | null,
    department_id: number | null,
    is_complete: boolean,
}

export interface RequisitionResponseData extends ResponseData {
    id: number
    data: Requisition
}

export interface  RequisitionCollectionResponse extends CollectionResponse {
    data: Array<RequisitionResponseData>
}

export interface CreateRequisitionAttributes {
    notes: string
}