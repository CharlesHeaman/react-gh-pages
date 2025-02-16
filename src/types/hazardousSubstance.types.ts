import { CollectionResponse, ResponseData } from "./response.types"

export interface HazardousSubstance {
    created_at: Date,
    created_by_id: number,
    description: string,
    is_active: boolean,
    image_url: string,
    name: string
}

export interface HazardousSubstanceResponseData extends ResponseData {
    id: number,
    data: HazardousSubstance
}

export interface  HazardousSubstanceCollectionResponse extends CollectionResponse {
    data: Array<HazardousSubstanceResponseData>
}