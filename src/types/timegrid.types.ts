import { CollectionResponse, ResponseData } from "./response.types"

export interface Timegrid {
    user_id: number,
    date: Date,
    status: number,
    is_authorisation_required: boolean,
    comment: string | null
}

export interface TimegridResponseData extends ResponseData {
    id: number,
    data: Timegrid
}

export interface TimegridCollectionResponse extends CollectionResponse {
    data: Array<TimegridResponseData>
}