import { CollectionResponse, ResponseData } from "./response.types"

export interface AdditionalTimeActivity {
    name: string,
    description: string,
    created_by_id: number,
    created_at: Date,
    is_active: boolean
}

export interface AdditionalTimeActivityResponseData extends ResponseData {
    id: number
    data: AdditionalTimeActivity
}

export interface  AdditionalTimeActivityCollectionResponse extends CollectionResponse {
    data: Array<AdditionalTimeActivityResponseData>
}

export interface CreateAdditionalTimeActivityAttributes {
    name: string,
    description: string,
}