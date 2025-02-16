import { CollectionResponse, ResponseData } from "./response.types"

export interface Ticket {
    number: number,
    suffix: number,
    ticket_type: number,
    parent_ticket_id: number | null, 
    department_id: number,
    is_started: boolean,
    is_job_complete: boolean,
    is_report_complete: boolean,
    is_unable_to_attend: boolean,
    is_engineer_data_processed: boolean,
    invoice_type_id: number | null,
    customer_id: number,
    equipment_id: number | null,
    contact_id: number | null,
    contract_id: number | null,
    site_id: number | null,
    job_description: string,
    engineers: Array<Engineer>
    visit_date: Date | null,
    engineer_report: string | null,
    engineer_materials: string | null,
    customer_viewable_report: string | null,
    completion_date: Date | null,
    is_further_work_required: boolean | null,
    is_ready_for_invoicing: boolean | null,
    is_priority: boolean,
    is_mate_required: boolean,
    is_rams_required: boolean,
    is_parts_required: boolean,
    is_rams_uploaded: boolean,
    is_parts_received: boolean,
    unable_to_attend_reason: string | null,
    is_invoice_requested: boolean,
    estimated_time: number,
    is_abandoned: boolean,
    parent_quote_id: number | null,
    job_number: string | null,
    purchase_order_number: string | null,
    reference: string | null,
}

export interface Engineer {
    user_id: number,
    is_lead: boolean
}


export interface TicketResponseData extends ResponseData {
    id: number,
    data: Ticket
}

export interface TicketCollectionResponse extends CollectionResponse {
    data: Array<TicketResponseData>
}

export interface AssignTicketAttributes {
    visit_date: Date,
}

export interface CreateTicketAttributes {
    job_description: string,
    estimated_time: string,
    is_mate_required: boolean,
    is_rams_required: boolean,
}

export interface CreateMaintenanceTicketAttributes {
    department_id: number,
    customer_id: number,
    site_id: number,
    contract_id: number,
    job_description: string,
    estimated_time: string,
    is_mate_required: boolean,
    is_rams_required: boolean,
    visit_date: Date | undefined,
}