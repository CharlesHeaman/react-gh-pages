import { CollectionResponse, ResponseData } from "./response.types"

export interface GasBottle {
    code: string,
    number: string,
    current_gas_weight: number,
    tare_weight: number,
    assigned_gas_weight: number,
    stores_returned_gas_weight: number,
    supplier_returned_gas_weight: number,
    assignment_changed_date: Date | null,
    supplier_returned_date: Date | null,
    received_date: Date,
    rental_months: number,
    rental_end_date: Date,
    refrigerant_id: number,
    assigned_to_id: number | null,
    supplier_id: number,
    supplier_returned_by_id: number | null,
    is_decant: boolean,
    is_queued: boolean,
    is_active: boolean,
    return_reference_number: string | null
}

export interface GasBottleResponseData extends ResponseData {
    id: number
    data: GasBottle
}

export interface  GasBottleCollectionResponse extends CollectionResponse {
    data: Array<GasBottleResponseData>
}

export interface CreateGasBottleAttributes {
    code: string,
    number: string,
    bottle_weight: string,
    tare_weight: string,
    received_date: Date,
    rental_months: string,
    is_decant: boolean,
}