import { CollectionResponse, ResponseData } from "./response.types"

export interface AdditionalTimeActivityActivity {
    vehicle_id: number,
    type: number,
    created_at: Date,
    created_by_id: number,
}

export interface AdditionalTimeActivityActivityResponseData extends ResponseData {
    id: number
    data: AdditionalTimeActivityActivity
}

export interface  AdditionalTimeActivityActivityCollectionResponse extends CollectionResponse {
    data: Array<AdditionalTimeActivityActivityResponseData>
}
