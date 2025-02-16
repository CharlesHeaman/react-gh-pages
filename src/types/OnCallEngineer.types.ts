import { CollectionResponse, ResponseData } from "./response.types"

export interface OnCallEngineer {
    created_at: Date,
    created_by_id: number,
    start_date: Date,
    end_date: Date,
    department_id: number,
    user_id: number
}

export interface OnCallEngineerResponseData extends ResponseData {
    id: number,
    data: OnCallEngineer
}

export interface  OnCallEngineerCollectionResponse extends CollectionResponse {
    data: Array<OnCallEngineerResponseData>
}