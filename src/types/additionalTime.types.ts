import { CollectionResponse, ResponseData } from "./response.types"

export interface AdditionalTime {
    user_id: number,
    date: Date,
    expenses: number,
    mileage: number,
    activity_time: number,
    travel_time: number,
    activity_id: number
}

export interface AdditionalTimeResponseData extends ResponseData {
    data: AdditionalTime
}

export interface AdditionalTimeCollectionResponse extends CollectionResponse {
    data: Array<AdditionalTimeResponseData>
}