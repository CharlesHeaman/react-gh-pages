import { CollectionResponse, ResponseData } from "./response.types"

export interface SiteActivity {
    site_id: number,
    type: number,
    created_at: Date,
    created_by_id: number,
}

export interface SiteActivityResponseData extends ResponseData {
    id: number
    data: SiteActivity
}

export interface  SiteActivityCollectionResponse extends CollectionResponse {
    data: Array<SiteActivityResponseData>
}
