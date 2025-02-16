import { CollectionResponse, ResponseData } from "./response.types"

export interface QuoteLine {
    quote_id: number,
    equipment_id: number | null,
    site_id: number | null,
    is_equipment: boolean,
    quantity: number,
    category: number,
    description: string,
    supplier: string,
    price: number,
    markup: number,
}

export interface QuoteLineResponseData extends ResponseData {
    id: number,
    data: QuoteLine
}

export interface  QuoteLineCollectionResponse extends CollectionResponse {
    data: Array<QuoteLineResponseData>
}
