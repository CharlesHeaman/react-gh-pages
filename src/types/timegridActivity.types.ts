import { CollectionResponse, ResponseData } from "./response.types"

export interface TimegridActivity {
    timegrid_id: number,
    activity_by_id: number,
    activity_date: Date,
    type: number
}

export interface TimegridActivityResponseData extends ResponseData {
    data: TimegridActivity
}

export interface  TimegridActivityCollectionResponse extends CollectionResponse {
    data: Array<TimegridActivityResponseData>
}