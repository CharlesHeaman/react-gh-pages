import { CollectionResponse, ResponseData } from "./response.types"

export interface Quote {
    created_by_id: number,
    originator: string | null,
    created_at: Date,
    number: string,
    department_id: number,
    is_reactive: boolean,
    is_maintenance: boolean,
    is_project: boolean,
    template: string,
    customer: string | null,
    customer_id: number | null,
    site_id: number | null,
    recipient_id: number | null, 
    ticket_id: number | null,
    ticket_type: number | null,
    description: string,
    notes: string | null,
    sent_at: Date | null,
    status: number,
    revision_number: number,
    value: number,
    quote_document_id: number | null,
    is_job: boolean,
    completion_date: Date | null,
}

export interface QuoteResponseData extends ResponseData {
    id: number,
    data: Quote
}

export interface  QuoteCollectionResponse extends CollectionResponse {
    data: Array<QuoteResponseData>
}

export interface CreateQuoteAttributes {
    description: string,
    notes: string
}