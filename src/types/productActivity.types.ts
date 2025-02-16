import { CollectionResponse, ResponseData } from "./response.types"

export interface ProductActivity {
    product_id: number,
    type: number,
    created_at: Date,
    created_by_id: number,
}

export interface ProductActivityResponseData extends ResponseData {
    id: number
    data: ProductActivity
}

export interface  ProductActivityCollectionResponse extends CollectionResponse {
    data: Array<ProductActivityResponseData>
}
