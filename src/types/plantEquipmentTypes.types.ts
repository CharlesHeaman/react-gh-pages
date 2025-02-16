import { CollectionResponse, ResponseData } from "./response.types"

export interface PlantEquipmentType {
    name: string,
    description: string,
    is_pa_test_required: boolean,
    is_calibration_test_required: boolean,
    is_inspection_required: boolean,
    is_maintenance_required: boolean,
    pa_test_frequency: number | null,
    calibration_test_frequency: number | null,
    inspection_frequency: number | null,
    maintenance_frequency: number | null,
    is_active: boolean,
}

export interface PlantEquipmentTypeResponseData extends ResponseData {
    id: number
    data: PlantEquipmentType
}

export interface  PlantEquipmentTypeCollectionResponse extends CollectionResponse {
    data: Array<PlantEquipmentTypeResponseData>
}

export interface CreatePlantEquipmentTypeAttributes {
    name: string,
    description: string,
    is_pa_test_required: boolean,
    is_calibration_test_required: boolean,
    is_inspection_required: boolean,
    is_maintenance_required: boolean,
    pa_test_frequency: string,
    calibration_test_frequency: string,
    inspection_frequency: string,
    maintenance_frequency: string,
}