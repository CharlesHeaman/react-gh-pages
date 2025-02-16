import { CollectionResponse, ResponseData } from "./response.types"

export interface TicketInvoiceRequest {
    created_by_id: number,
    processed_by_id: number | null,
    approved_by_id: number | null,
    created_at: Date,
    department_id: number,
    ticket_number: number,
    ticket_type: number,
    requested_value: number,
    invoice_value: number,
    is_processed: boolean,
    is_approved: boolean,
    holding_for_purchase_order_number: boolean,
    processed_date: Date,
    invoice_number: string,
    invoice_date: Date,
    labour_cost: number,
    mileage_cost: number,
    expenses_cost: number,
    material_cost: number,
    sub_contract_cost: number,
    hire_cost: number,
    labour_charge: number,
    mileage_charge: number,
    expenses_charge: number,
    material_charge: number,
    sub_contract_charge: number,
    hire_charge: number,
    invoice_text: string,
    accounts_notes: string | null
}

export interface TicketInvoiceRequestResponseData extends ResponseData {
    id: number,
    data: TicketInvoiceRequest
}

export interface TicketInvoiceRequestCollectionResponse extends CollectionResponse {
    data: Array<TicketInvoiceRequestResponseData>
}

export interface CreateTicketInvoiceRequestAttributes {
    requested_value: string,
    invoice_text: string,
    accounts_notes: string,
    purchase_order_number: string,
    holding_for_purchase_order_number: boolean,
}