import { CollectionResponse, ResponseData } from "./response.types"

export interface PurchaseOrderAttachment {
    vehicle_id: number,
    created_by_id: number,
    created_at: Date,
    name: string,
    file_name: string,
    is_active: boolean,
}

export interface PurchaseOrderAttachmentResponseData extends ResponseData {
    id: number,
    data: PurchaseOrderAttachment
}

export interface PurchaseOrderAttachmentCollectionResponse extends CollectionResponse {
    data: Array<PurchaseOrderAttachmentResponseData>
}

export interface CreatePurchaseOrderDocumentAttributes {
    name: string,
}
