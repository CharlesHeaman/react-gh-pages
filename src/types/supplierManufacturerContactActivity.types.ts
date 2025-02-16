import { CollectionResponse, ResponseData } from "./response.types"

export interface SupplierManufacturerContactActivity {
    supplier_manufacturer_contact_id: number,
    type: number,
    created_at: Date,
    created_by_id: number,
}

export interface SupplierManufacturerContactActivityResponseData extends ResponseData {
    id: number
    data: SupplierManufacturerContactActivity
}

export interface  SupplierManufacturerContactActivityCollectionResponse extends CollectionResponse {
    data: Array<SupplierManufacturerContactActivityResponseData>
}
