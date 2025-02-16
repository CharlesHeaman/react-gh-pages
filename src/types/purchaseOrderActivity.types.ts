import { CollectionResponse, ResponseData } from "./response.types"

export interface PurchaseOrderActivity {
    purchase_order_id: number,
    type: number,
    created_at: Date,
    created_by_id: number,
}

export interface PurchaseOrderActivityResponseData extends ResponseData {
    id: number
    data: PurchaseOrderActivity
}

export interface  PurchaseOrderActivityCollectionResponse extends CollectionResponse {
    data: Array<PurchaseOrderActivityResponseData>
}

export interface CreatePurchaseOrderActivityAttributes {
    notes: string
}