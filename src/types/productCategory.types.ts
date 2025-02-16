import { CollectionResponse, ResponseData } from "./response.types"

export interface ProductCategory {
    name: string,
    description: string,
    is_active: boolean,
}

export interface ProductCategoryResponseData extends ResponseData {
    id: number
    data: ProductCategory
}

export interface  ProductCategoryCollectionResponse extends CollectionResponse {
    data: Array<ProductCategoryResponseData>
}

export interface CreateProductCategoryAttributes {
    name: string,
    description: string,
}