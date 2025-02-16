import { CollectionResponse, ResponseData } from "./response.types"

export interface RefrigerantMovement {
    engineer_id: number,
    movement_date: Date,
    refrigerant_id: number,
    ticket_id: number,
    ticket_type: number,
    is_decant: boolean,
    weight: number
}

export interface RefrigerantMovementResponseData extends ResponseData {
    id: number,
    data: RefrigerantMovement
}

export interface  RefrigerantMovementCollectionResponse extends CollectionResponse {
    data: Array<RefrigerantMovementResponseData>
}