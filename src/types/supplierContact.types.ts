import { CollectionResponse, ResponseData } from "./response.types"

export interface SupplierContact {
    supplier_manufacturer_id: number,
    name: string,
    email: string | null,
    mobile: string | null,
    telephone: string | null,
    is_active: boolean,
    notes: string | null,
}

export interface SupplierContactResponseData extends ResponseData {
    id: number,
    data: SupplierContact
}

export interface  SupplierContactCollectionResponse extends CollectionResponse {
    data: Array<SupplierContactResponseData>
}


export interface CreateSupplierContactAttributes {
    name: string,
    email: string,
    mobile: string,
    telephone: string,
    notes: string,
}