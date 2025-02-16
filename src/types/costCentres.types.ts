import { CollectionResponse, ResponseData } from "./response.types"

export interface CostCentre {
    name: string,
    description: string,
    is_active: boolean,
    associated_resource_type: number | null,
    department_id: number | null,
}

export interface CostCentreResponseData extends ResponseData {
    id: number
    data: CostCentre
}

export interface  CostCentreCollectionResponse extends CollectionResponse {
    data: Array<CostCentreResponseData>
}

export interface CreateCostCentreAttributes {
    name: string,
    description: string,
}