import { CollectionResponse, ResponseData } from "./response.types"

export interface CostCentreActivity {
    cost_centre_id: number,
    type: number,
    created_at: Date,
    created_by_id: number,
}

export interface CostCentreActivityResponseData extends ResponseData {
    id: number
    data: CostCentreActivity
}

export interface  CostCentreActivityCollectionResponse extends CollectionResponse {
    data: Array<CostCentreActivityResponseData>
}
