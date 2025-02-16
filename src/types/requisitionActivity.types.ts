import { CollectionResponse, ResponseData } from "./response.types"

export interface RequisitionActivity {
    requisition_id: number,
    type: number,
    created_at: Date,
    created_by_id: number,
}

export interface RequisitionActivityResponseData extends ResponseData {
    id: number
    data: RequisitionActivity
}

export interface  RequisitionActivityCollectionResponse extends CollectionResponse {
    data: Array<RequisitionActivityResponseData>
}
