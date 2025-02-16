import { CollectionResponse, ResponseData } from "./response.types"

export interface PlantEquipmentActivity {
    plant_equipment_id: number,
    type: number,
    created_at: Date,
    created_by_id: number,
}

export interface PlantEquipmentActivityResponseData extends ResponseData {
    id: number
    data: PlantEquipmentActivity
}

export interface  PlantEquipmentActivityCollectionResponse extends CollectionResponse {
    data: Array<PlantEquipmentActivityResponseData>
}
