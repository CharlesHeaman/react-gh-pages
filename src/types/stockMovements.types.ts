import { CollectionResponse, ResponseData } from "./response.types"

export interface StockMovements {
    product_id: number,
    type: number,
    description: string,
    created_at: Date,
    created_by_id: number,
}

export interface StockMovementsResponseData extends ResponseData {
    id: number
    data: StockMovements
}

export interface  StockMovementsCollectionResponse extends CollectionResponse {
    data: Array<StockMovementsResponseData>
}
