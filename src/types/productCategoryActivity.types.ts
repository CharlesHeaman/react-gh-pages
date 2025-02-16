import { CollectionResponse, ResponseData } from "./response.types"

export interface ProductCategoryActivity {
    product_category_id: number,
    type: number,
    created_at: Date,
    created_by_id: number,
}

export interface ProductCategoryActivityResponseData extends ResponseData {
    id: number
    data: ProductCategoryActivity
}

export interface  ProductCategoryActivityCollectionResponse extends CollectionResponse {
    data: Array<ProductCategoryActivityResponseData>
}
