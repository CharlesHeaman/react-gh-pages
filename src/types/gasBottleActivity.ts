import { CollectionResponse, ResponseData } from "./response.types"

export interface GasBottleActivity {
    gas_bottle_id: number,
    current_gas_weight: number,
    gas_weight_difference: number,
    type: number,
    date: Date,
    performed_by_id: number,
    assigned_to_id: number,
}

export interface GasBottleActivityResponseData extends ResponseData {
    id: number
    data: GasBottleActivity
}

export interface  GasBottleActivityCollectionResponse extends CollectionResponse {
    data: Array<GasBottleActivityResponseData>
}