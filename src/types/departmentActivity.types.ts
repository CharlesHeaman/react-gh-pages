import { CollectionResponse, ResponseData } from "./response.types"

export interface DepartmentActivity {
    department_id: number,
    type: number,
    created_at: Date,
    created_by_id: number,
}

export interface DepartmentActivityResponseData extends ResponseData {
    id: number
    data: DepartmentActivity
}

export interface  DepartmentActivityCollectionResponse extends CollectionResponse {
    data: Array<DepartmentActivityResponseData>
}
