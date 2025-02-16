import { CollectionResponse, ResponseData } from "./response.types"

export interface PurchaseOrder {
    created_by_id: number,
    created_at: Date,
    sent_by_id: number | null,
    sent_at: Date | null,
    supplier_id: number,
    assigned_customer_id: number,
    is_outstanding: boolean,
    is_accounts_outstanding: boolean,
    has_received: boolean,
    has_reconciled: boolean,
    cost_centre_id: number,
    delivery_date: Date,
    dispatch_by_type: number,
    payment_type: number,
    special_instructions: string | null,
    customer_id: number | null,
    user_id: number | null,
    vehicle_id: number | null,
    ticket_number: number | null,
    department_id: number | null,
    job_number: number | null,
}

export interface PurchaseOrderResponseData extends ResponseData {
    id: number,
    data: PurchaseOrder
}

export interface  PurchaseOrderCollectionResponse extends CollectionResponse {
    data: Array<PurchaseOrderResponseData>
}

export interface CreatePurchaseOrderAttributes {
    delivery_date: Date,
    special_instructions: string
}