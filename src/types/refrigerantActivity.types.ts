import { CollectionResponse, ResponseData } from "./response.types"

export interface RefrigerantActivity {
    refrigerant_id: number,
    type: number,
    created_at: Date,
    created_by_id: number,
}

export interface RefrigerantActivityResponseData extends ResponseData {
    id: number
    data: RefrigerantActivity
}

export interface  RefrigerantActivityCollectionResponse extends CollectionResponse {
    data: Array<RefrigerantActivityResponseData>
}
