import { CollectionResponse, ResponseData } from "./response.types"

export interface Vehicle {
    is_active: boolean,
    make: string,
    model: string,
    registration_number: string,
    original_registration_number: string,
    tracker_vehicle_id: string | null,
    user_id: number | null, 
    cost_centre_id: number,
    registration_date: Date,
    mot_due_date: Date,
    tax_due_date: Date,
    notes: string | null
}

export interface VehicleResponseData extends ResponseData {
    id: number
    data: Vehicle
}

export interface  VehicleCollectionResponse extends CollectionResponse {
    data: Array<VehicleResponseData>
}

export interface CreateVehicleAttributes {
    registration_number: string,
    original_registration_number: string,
    registration_date: Date,
    make: string,
    model: string,
    mot_due_date: Date,
    tax_due_date: Date,
    notes: string,
}
