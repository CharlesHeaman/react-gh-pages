import { CollectionResponse, ResponseData } from "./response.types"

export interface ContactActivity {
    contact_id: number,
    type: number,
    created_at: Date,
    created_by_id: number,
}

export interface ContactActivityResponseData extends ResponseData {
    id: number
    data: ContactActivity
}

export interface  ContactActivityCollectionResponse extends CollectionResponse {
    data: Array<ContactActivityResponseData>
}
