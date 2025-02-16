import { CollectionResponse, ResponseData } from "./response.types"

export interface EquipmentTypeActivity {
    equipment_type_id: number,
    type: number,
    created_at: Date,
    created_by_id: number,
}

export interface EquipmentTypeActivityResponseData extends ResponseData {
    id: number
    data: EquipmentTypeActivity
}

export interface  EquipmentTypeActivityCollectionResponse extends CollectionResponse {
    data: Array<EquipmentTypeActivityResponseData>
}
