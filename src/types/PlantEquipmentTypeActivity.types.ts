import { CollectionResponse, ResponseData } from "./response.types"

export interface PlantEquipmentTypeActivity {
    plant_equipment_type_id: number,
    type: number,
    created_at: Date,
    created_by_id: number,
}

export interface PlantEquipmentTypeActivityResponseData extends ResponseData {
    id: number
    data: PlantEquipmentTypeActivity
}

export interface  PlantEquipmentTypeActivityCollectionResponse extends CollectionResponse {
    data: Array<PlantEquipmentTypeActivityResponseData>
}
