import { CollectionResponse, ResponseData } from "./response.types"

export interface InvoiceTypeActivity {
    invoice_type_id: number,
    type: number,
    created_at: Date,
    created_by_id: number,
}

export interface InvoiceTypeActivityResponseData extends ResponseData {
    id: number
    data: InvoiceTypeActivity
}

export interface  InvoiceTypeActivityCollectionResponse extends CollectionResponse {
    data: Array<InvoiceTypeActivityResponseData>
}
