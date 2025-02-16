import { CollectionResponse, ResponseData } from "./response.types"

export interface TicketNote {
    created_at: Date,
    created_by_id: number,
    text: string,
    ticket_id: number,
    ticket_type: number
}

export interface TicketNoteResponseData extends ResponseData {
    data: TicketNote
}

export interface  TicketNoteCollectionResponse extends CollectionResponse {
    data: Array<TicketNoteResponseData>
}