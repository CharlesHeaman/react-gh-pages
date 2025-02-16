import { CollectionResponse, ResponseData } from "./response.types"

export interface RequisitionLine {
    requisition_number: number,
    quantity: number,
    product_id: number,
    product_description: string,
    nett_price: number,
    adjusted_price: number,
    product_unit: string,
    catalogue_number: string,
    item_type: number,
}

export interface RequisitionLineResponseData extends ResponseData {
    id: number
    data: RequisitionLine
}

export interface  RequisitionLineCollectionResponse extends CollectionResponse {
    data: Array<RequisitionLineResponseData>
}