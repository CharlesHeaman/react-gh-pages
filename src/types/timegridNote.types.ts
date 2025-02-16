import { CollectionResponse, ResponseData } from "./response.types"

export interface TimegridNote {
    created_at: Date,
    created_by_id: number,
    text: string,
    date: Date,
    user_id: number
}

export interface TimegridNoteResponseData extends ResponseData {
    id: number,
    data: TimegridNote
}

export interface  TimegridNoteCollectionResponse extends CollectionResponse {
    data: Array<TimegridNoteResponseData>
}