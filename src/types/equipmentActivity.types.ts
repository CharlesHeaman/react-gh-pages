import { CollectionResponse, ResponseData } from "./response.types"

export interface EquipmentActivity {
    equipment_id: number,
    type: number,
    created_at: Date,
    created_by_id: number,
}

export interface EquipmentActivityResponseData extends ResponseData {
    id: number
    data: EquipmentActivity
}

export interface  EquipmentActivityCollectionResponse extends CollectionResponse {
    data: Array<EquipmentActivityResponseData>
}
