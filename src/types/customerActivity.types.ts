import { CollectionResponse, ResponseData } from "./response.types"

export interface CustomerActivity {
    customer_id: number,
    type: number,
    created_at: Date,
    created_by_id: number,
}

export interface CustomerActivityResponseData extends ResponseData {
    id: number
    data: CustomerActivity
}

export interface  CustomerActivityCollectionResponse extends CollectionResponse {
    data: Array<CustomerActivityResponseData>
}
