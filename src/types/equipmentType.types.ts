import { CollectionResponse, ResponseData } from "./response.types"

export interface EquipmentType {
    name: string,
    department_ids: Array<number>,
    service_duration: number,
    is_master: boolean,
    is_slave: boolean,
    slave_quantity: number,
    is_active: boolean,
    energy_source: number | null
}

export interface EquipmentTypeResponseData extends ResponseData {
    id: number,
    data: EquipmentType
}

export interface  EquipmentTypeCollectionResponse extends CollectionResponse {
    data: Array<EquipmentTypeResponseData>
}

export interface CreateEquipmentTypeAttributes {
    name: string,
    service_duration: string,
    is_master: boolean,
    is_slave: boolean,
    slave_quantity: string,
    is_variable_slave_quantity: boolean,
}
