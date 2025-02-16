import { CollectionResponse, ResponseData } from "./response.types"

export interface SupplierManufacturerActivity {
    supplier_manufacturer_id: number,
    type: number,
    created_at: Date,
    created_by_id: number,
}

export interface SupplierManufacturerActivityResponseData extends ResponseData {
    id: number
    data: SupplierManufacturerActivity
}

export interface  SupplierManufacturerActivityCollectionResponse extends CollectionResponse {
    data: Array<SupplierManufacturerActivityResponseData>
}
