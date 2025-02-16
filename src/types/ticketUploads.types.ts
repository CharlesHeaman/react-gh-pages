import { CollectionResponse, ResponseData } from "./response.types"

export interface TicketUpload {
    ticket_id: number,
    ticket_type: number, 
    name: string,
    file_name: string,
    created_at: Date,
    created_by_id: number,
    is_active: boolean,
}

export interface TicketUploadResponseData extends ResponseData {
    data: TicketUpload
}

export interface  TicketUploadCollectionResponse extends CollectionResponse {
    data: Array<TicketUploadResponseData>
}