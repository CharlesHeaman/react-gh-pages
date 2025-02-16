import { CollectionResponse, ResponseData } from "./response.types";

export interface AssociatedHazardousSubstance {
    created_at: Date,
    created_by_id: number,
    risk_assessment_id: number,
    hazardous_substance_id: number,
}

export interface AssociatedHazardousSubstanceResponseData extends ResponseData {
    id: number,
    data: AssociatedHazardousSubstance,
}

export interface AssociatedHazardousSubstanceCollectionResponse extends CollectionResponse {
    data: Array<AssociatedHazardousSubstanceResponseData>,
}