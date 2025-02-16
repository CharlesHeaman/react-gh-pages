import { CollectionResponse, ResponseData } from "./response.types"

export interface Equipment {
    code: string,
    site_id: number,
    location: string,
    description: string
    created_at: Date,
    created_by_id: number,
    serial_number: string,
    model_number: string,
    serial_number_2: string,
    model_number_2: string,
    notes: string | null,
    internal_notes: string | null,
    is_active: boolean,
    department_id: number,
    equipment_type_id: number | null,
    supplier_id: number | null,
    manufacturer_id: number | null,
    last_service_at: Date | null,
    next_service_at: Date | null,
    install_date: Date | null,
    refrigerant_id: number | null,
    refrigerant_charge: number,
    f_gas_type: number,
    is_leak_detection_fitted: boolean,
    is_hermetically_sealed: boolean,
    fuel_type: number,
    gas_council_number: string | null,
    nozzle: string | null,
    pump: string | null,
    master_equipment_id: number | null
}

export interface EquipmentResponseData extends ResponseData {
    id: number,
    data: Equipment
}

export interface  EquipmentCollectionResponse extends CollectionResponse {
    data: Array<EquipmentResponseData>
}


export interface CreateEquipmentAttributes {
    code: string,
    location: string,
    description: string,
    notes: string,
    internal_notes: string,
    model_number: string,
    serial_number: string,
    model_number_2: string,
    serial_number_2: string,
    refrigerant_charge: string,
    is_leak_detection_fitted: boolean,
    is_hermetically_sealed: boolean,
    fuel_type: number,
    gas_council_number: string,
    nozzle: string,
    pump: string,
}

export interface CreateEquipmentCollectionAttributes {
    quantity: string,
    equipment_type_name: string,
    equipment_type_id: number,
    slave_quantity: number,
    variable_slave_quantity: Array<string>
}