import { CollectionResponse, ResponseData } from "./response.types"

export interface ProductQuery {
    name: string,
    description: string,
    created_by_id: number,
    created_at: Date,
    is_sundry: boolean | null,
    is_active: boolean | null,
    is_stock: boolean | null,
    description_like: string | null,
    unit_like: string | null,
    size_or_model_like: string | null,
    price_greater_than: number | null,
    price_less_than: number | null,
    selling_price_greater_than: number | null,
    selling_price_less_than: number | null,
    percentage_discount_greater_than: number | null,
    percentage_discount_less_than: number | null,
    percentage_markup_greater_than: number | null,
    percentage_markup_less_than: number | null,
    days_since_last_requisition_less_than: number | null,
    days_since_last_requisition_greater_than: number | null,
    stock_level_greater_than: number | null,
    stock_level_less_than: number | null,
}

export interface ProductQueryResponseData extends ResponseData {
    id: number,
    data: ProductQuery
}

export interface  ProductQueryCollectionResponse extends CollectionResponse {
    data: Array<ProductQueryResponseData>
}