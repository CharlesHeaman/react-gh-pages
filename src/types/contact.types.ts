import { CollectionResponse, ResponseData } from "./response.types"

export interface Contact {
    customer_id: number,
    name: string,
    email: string | null,
    mobile: string | null,
    telephone: string | null,
    is_active: boolean,
    notes: string | null,
}

export interface ContactResponseData extends ResponseData {
    id: number,
    data: Contact
}

export interface  ContactCollectionResponse extends CollectionResponse {
    data: Array<ContactResponseData>
}

export interface CreateContactAttributes {
    name: string,
    email: string,
    mobile: string,
    telephone: string,
    notes: string,
}