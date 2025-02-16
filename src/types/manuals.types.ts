import { CollectionResponse, ResponseData } from "./response.types"

export interface Manual {
    created_at: Date,
    created_by_id: number,
    name: string,
    upload_url: string,
    is_active: boolean
}

export interface ManualResponseData extends ResponseData {
    id: number,
    data: Manual
}

export interface  ManualCollectionResponse extends CollectionResponse {
    data: Array<ManualResponseData>
}