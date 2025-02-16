import { CollectionResponse, ResponseData } from "./response.types"

export interface EngineerEquipmentDetailsActivity {
    engineer_equipment_details_id: number,
    type: number,
    created_at: Date,
    created_by_id: number,
}

export interface EngineerEquipmentDetailsActivityResponseData extends ResponseData {
    id: number
    data: EngineerEquipmentDetailsActivity
}

export interface  EngineerEquipmentDetailsActivityCollectionResponse extends CollectionResponse {
    data: Array<EngineerEquipmentDetailsActivityResponseData>
}
