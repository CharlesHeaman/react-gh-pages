import { CollectionResponse, ResponseData } from "./response.types"

export interface VehicleActivity {
    vehicle_id: number,
    type: number,
    created_at: Date,
    created_by_id: number,
}

export interface VehicleActivityResponseData extends ResponseData {
    id: number
    data: VehicleActivity
}

export interface  VehicleActivityCollectionResponse extends CollectionResponse {
    data: Array<VehicleActivityResponseData>
}
