import { CollectionResponse, ResponseData } from "./response.types"

export interface NonContractRates {
    customer_id: number,
    department_id: number,
    parts_markup_percentage: number,
    labour_rate: number,
    mate_rate: number,
    mileage_rate: number,
    sub_contract_markup_percentage: number,
    hire_markup: number,
}

export interface NonContractRatesResponseData extends ResponseData {
    id: number,
    data: NonContractRates
}

export interface  NonContractRatesCollectionResponse extends CollectionResponse {
    data: Array<NonContractRatesResponseData>
}