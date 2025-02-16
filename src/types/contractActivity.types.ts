import { CollectionResponse, ResponseData } from "./response.types"

export interface ContractActivity {
    contract_id: number,
    type: number,
    created_at: Date,
    created_by_id: number,
}

export interface ContractActivityResponseData extends ResponseData {
    id: number
    data: ContractActivity
}

export interface  ContractActivityCollectionResponse extends CollectionResponse {
    data: Array<ContractActivityResponseData>
}
