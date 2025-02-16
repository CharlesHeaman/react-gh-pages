import { CollectionResponse, ResponseData } from "./response.types"

export interface PlantEquipmentDocuments {
    plant_equipment_id: number,
    created_by_id: number,
    created_at: Date,
    name: string,
    file_name: string,
    is_active: boolean,
    type: number
}

export interface PlantEquipmentDocumentsResponseData extends ResponseData {
    id: number,
    data: PlantEquipmentDocuments
}

export interface PlantEquipmentDocumentsCollectionResponse extends CollectionResponse {
    data: Array<PlantEquipmentDocumentsResponseData>
}

export interface CreatePlantEquipmentDocumentAttributes {
    name: string,
}
