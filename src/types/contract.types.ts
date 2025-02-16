import { CollectionResponse, ResponseData } from "./response.types"

export interface Contract {
    customer_id: number,
    reference_number: string,
    department_id: number,
    contract_value: number,
    start_at: Date,
    end_at: Date,
    is_active: boolean,
    is_fixed_three_year: boolean,
    service_per_year: number,
    purchase_order_number: string | null,
    invoice_period: number,
    notes: string | null,
    mileage_rate: number,
    engineer_rate: number,
    mate_rate: number,
    material_markup: number,
    subcontract_markup: number,
    invoice_type: number,
    hire_markup: number,
}

export interface ContractResponseData extends ResponseData {
    id: number,
    data: Contract
}

export interface  ContractCollectionResponse extends CollectionResponse {
    data: Array<ContractResponseData>
}

export interface CreateContractAttributes {
    reference_number: string,
    contract_value: string,
    start_at: Date,
    end_at: Date,
    is_fixed_three_year: boolean,
    service_per_year: string,
    purchase_order_number: string,
    notes: string,
    mileage_rate: string,
    engineer_rate: string,
    mate_rate: string,
    material_markup: string,
    subcontract_markup: string,
    hire_markup: string,
}