import { CollectionResponse, ResponseData } from "./response.types"

export interface PersonnelProtectiveEquipment {
    created_at: Date,
    created_by_id: number,
    description: string,
    is_active: boolean,
    image_url: string,
    name: string
}

export interface PersonnelProtectiveEquipmentResponseData extends ResponseData {
    id: number,
    data: PersonnelProtectiveEquipment
}

export interface  PersonnelProtectiveEquipmentCollectionResponse extends CollectionResponse {
    data: Array<PersonnelProtectiveEquipmentResponseData>
}