import { CollectionResponse, ResponseData } from "./response.types"

export interface InvoiceTicketTime {
    date: Date,
    expenses: number,
    mileage: number,
    on_site_time: number,
    ticket_id: number,
    ticket_type: number,
    travel_time: number,
    user_id: number,
    is_mate_rate: boolean,
    is_overtime: boolean,
    is_double_time: boolean,
    intercompany_rate: number | null,
}

export interface InvoiceTicketTimeResponseData extends ResponseData {
    id: number,
    data: InvoiceTicketTime
}

export interface  InvoiceTicketTimeCollectionResponse extends CollectionResponse {
    data: Array<InvoiceTicketTimeResponseData>
}