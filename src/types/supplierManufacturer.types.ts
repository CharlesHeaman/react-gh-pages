import { CollectionResponse, ResponseData } from "./response.types"

export interface SupplierManufacturer {
    code: string,
    name: string,
    sage_name: string | null,
    accounts_email: string,
    accounts_telephone: string,
    remittance_address: string,
    accounts_notes: string | null,
    address: string,
    postcode: string,
    email: string,
    telephone: string,
    website_url: string | null,
    is_active: boolean,
    is_supplier: boolean,
    is_manufacturer: boolean,
    is_sub_contractor: boolean,
    is_gas_supplier: boolean,
    is_approved: boolean | null,
    approval_updated_by_id: number | null,
    approval_updated_at: Date | null,
    notes: string | null
}

export interface SupplierManufacturerResponseData extends ResponseData {
    id: number,
    data: SupplierManufacturer
}

export interface  SupplierManufacturerCollectionResponse extends CollectionResponse {
    data: Array<SupplierManufacturerResponseData>
}

export interface CreateSupplierManufacturerAttributes {
    name: string,
    code: string,
    address: string,
    postcode: string,
    notes: string,
    is_supplier: boolean,
    is_manufacturer: boolean,
    is_sub_contractor: boolean,
    is_gas_supplier: boolean,
    email: string,
    telephone: string,
    website_url: string,
    sage_name: string,
    accounts_email: string,
    accounts_telephone: string,
    remittance_address: string,
    accounts_notes: string,
}