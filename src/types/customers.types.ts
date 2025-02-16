import { CollectionResponse, ResponseData } from "./response.types"

export interface Customer {
    created_at: Date,
    created_by_id: number,
    name: string,
    code: string,
    address: string,
    postcode: string,
    email: string,
    telephone: string,
    is_contracted: boolean,
    is_active: boolean,
    special_instructions: string | null,
    accounts_notes: string | null,
    sage_name: string | null,
    accounts_email: string | null,
    invoice_address: string | null,
    accounts_status: number,
    tickets_always_require_purchase_order: boolean,
    tickets_always_require_rams: boolean,
}

export interface CustomerResponseData extends ResponseData {
    id: number,
    data: Customer
}

export interface  CustomerCollectionResponse extends CollectionResponse {
    data: Array<CustomerResponseData>
}

export interface CreateCustomerAttributes {
    name: string,
    code: string,
    address: string,
    postcode: string,
    email: string,
    telephone: string,
    special_instructions: string,
    accounts_notes: string,
    sage_name: string,
    accounts_email: string,
    invoice_address: string,
    accounts_status: number,
    tickets_always_require_purchase_order: boolean,
    tickets_always_require_rams: boolean,
}
