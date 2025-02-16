import { CollectionResponse, ResponseData } from "./response.types"

export interface Department {
    name: string,
    description: string,
    day_max_hours: number,
    uses_refrigerant_module: boolean,
    uses_fuel_module: boolean,
    uses_schedule_of_works_module: boolean,
    uses_equipment_module: boolean,
    uses_job_module: boolean,
    uses_collection_module: boolean,
    is_active: boolean,
    label_color: string | null,
    mileage_rate: number,
    engineer_rate: number,
    mate_rate: number,
    material_markup: number,
    subcontract_markup: number,
    hire_markup: number,
    contract_mileage_rate: number,
    contract_engineer_rate: number,
    contract_mate_rate: number,
    contract_material_markup: number,
    contract_subcontract_markup: number,
    contract_hire_markup: number,
    quote_seed: number,
    ticket_seed: number,
}

export interface DepartmentResponseData extends ResponseData {
    id: number
    data: Department
}

export interface  DepartmentCollectionResponse extends CollectionResponse {
    data: Array<DepartmentResponseData>
}

export interface CreateDepartmentAttributes {
    name: string,
    description: string,
    day_max_hours: string,
    mileage_rate: string,
    engineer_rate: string,
    mate_rate: string,
    material_markup: string,
    subcontract_markup: string,
    hire_markup: string,
    contract_mileage_rate: string,
    contract_engineer_rate: string,
    contract_mate_rate: string,
    contract_material_markup: string,
    contract_subcontract_markup: string,
    contract_hire_markup: string,
}