import { CollectionResponse, ResponseData } from "./response.types"

export interface SiteContact {
    created_at: Date,
    created_by_id: number,
    site_id: number,
    contact_id: number,
}

export interface SiteContactResponseData extends ResponseData {
    id: number,
    data: SiteContact
}

export interface  SiteContactCollectionResponse extends CollectionResponse {
    data: Array<SiteContactResponseData>
}
