import { CollectionResponse, ResponseData } from "./response.types"

export interface Product {
    is_sundry: boolean,
    description: string,
    size_or_model: string,
    unit: string,
    image_file_name: string | null,
    is_active: boolean,
    price: number,
    percentage_discount: number,
    percentage_markup: number,
    selling_price: number | null,
    stock_level: number,
    is_stock: boolean,
    supplier_id: number,
    manufacturer: string,
    manufacturer_id: number | null,
    category_id: number,
    department_id: number | null,
    catalogue_number: string,
    part_number: string,
    stores_area: string | null,
    stores_rack: string | null,
    stores_bin: string | null,
    alternative_stores_location: string | null,
    order_threshold: number | null,
    parent_product_id: number | null,
    parent_price_percentage: number | null,
    order_outstanding: number | undefined,
}

export interface ProductResponseData extends ResponseData {
    id: number,
    data: Product
}

export interface  ProductCollectionResponse extends CollectionResponse {
    data: Array<ProductResponseData>
}

export interface CreateProductAttributes {
    description: string,
    size_or_model: string,
    unit: string,
    catalogue_number: string,
    part_number: string,
    price: string,
    percentage_discount: string,
    percentage_markup: string,
}

export interface CreateSundryProductAttributes {
    description: string,
    size_or_model: string,
    unit: string,
    parent_price_percentage: string,
}

export interface ConvertToStockProductAttributes {
    stores_area: string,
    stores_rack: string,
    stores_bin: string,
    // alternative_stores_location: string,
    stock_level: string,
}