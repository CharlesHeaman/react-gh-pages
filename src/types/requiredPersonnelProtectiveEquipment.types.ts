import { CollectionResponse, ResponseData } from "./response.types"

export interface RequiredPersonnelProtectiveEquipment {
    created_at: Date,
    created_by_id: number,
    risk_assessment_id: number,
    personnel_protective_equipment: number
}

export interface RequiredPersonnelProtectiveEquipmentResponseData extends ResponseData {
    id: number,
    data: RequiredPersonnelProtectiveEquipment
}

export interface  RequiredPersonnelProtectiveEquipmentCollectionResponse extends CollectionResponse {
    data: Array<RequiredPersonnelProtectiveEquipmentResponseData>
}