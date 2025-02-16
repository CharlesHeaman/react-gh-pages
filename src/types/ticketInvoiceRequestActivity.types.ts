import { CollectionResponse, ResponseData } from "./response.types"

export interface TicketInvoiceRequestActivity {
    ticket_invoice_request_id: number,
    type: number,
    created_at: Date,
    created_by_id: number,
}

export interface TicketInvoiceRequestActivityResponseData extends ResponseData {
    id: number
    data: TicketInvoiceRequestActivity
}

export interface  TicketInvoiceRequestActivityCollectionResponse extends CollectionResponse {
    data: Array<TicketInvoiceRequestActivityResponseData>
}

export interface CreateTicketInvoiceRequestActivityAttributes {
    notes: string
}