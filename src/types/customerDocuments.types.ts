import { CollectionResponse, ResponseData } from "./response.types"

export interface CustomerDocuments {
    customer_id: number,
    created_by_id: number,
    created_at: Date,
    name: string,
    file_name: string,
    is_active: boolean,
    type: number
}

export interface CustomerDocumentsResponseData extends ResponseData {
    id: number,
    data: CustomerDocuments
}

export interface CustomerDocumentsCollectionResponse extends CollectionResponse {
    data: Array<CustomerDocumentsResponseData>
}

export interface CreateCustomerDocumentAttributes {
    name: string,
}
