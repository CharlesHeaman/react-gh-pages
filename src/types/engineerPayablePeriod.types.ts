import { CollectionResponse, ResponseData } from "./response.types"

export interface EngineerPayablePeriod {
    date: Date
    user_id: number
    created_at: Date
    created_by_id: number
    start_date: Date
    end_date: Date
}

export interface EngineerPayablePeriodResponseData extends ResponseData {
    data: EngineerPayablePeriod
}

export interface EngineerPayablePeriodCollectionResponse extends CollectionResponse {
    data: Array<EngineerPayablePeriodResponseData>
}