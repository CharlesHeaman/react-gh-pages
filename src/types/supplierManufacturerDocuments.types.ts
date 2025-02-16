import { CollectionResponse, ResponseData } from "./response.types"

export interface SupplierManufacturerDocuments {
    supplier_id: number,
    created_by_id: number,
    created_at: Date,
    name: string,
    file_name: string,
    valid_from: Date,
    valid_to: Date,
    is_active: boolean,
    type: number
}

export interface SupplierManufacturerDocumentsResponseData extends ResponseData {
    id: number,
    data: SupplierManufacturerDocuments
}

export interface SupplierManufacturerDocumentsCollectionResponse extends CollectionResponse {
    data: Array<SupplierManufacturerDocumentsResponseData>
}

export interface CreateSupplierManufacturerDocumentAttributes {
    name: string,
    valid_from: Date,
}
