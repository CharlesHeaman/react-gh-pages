import { CollectionResponse, ResponseData } from "./response.types"

export interface PurchaseOrderLine {
    purchase_order_id: number,
    quantity_ordered: number,
    quantity_received: number,
    accounts_quantity_outstanding: number,
    product_id: number,
    product_description: string,
    catalogue_number: string,
    product_price: number,
    status: number,
    requisition_number: number | null,
}

export interface PurchaseOrderLineResponseData extends ResponseData {
    id: number,
    data: PurchaseOrderLine
}

export interface  PurchaseOrderLineCollectionResponse extends CollectionResponse {
    data: Array<PurchaseOrderLineResponseData>
}