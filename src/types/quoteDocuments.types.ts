import { ResponseData, CollectionResponse } from "./response.types"

export interface QuoteDocument {
    quote_id: number,
    created_by_id: number,
    created_at: Date,
    name: string,
    file_name: string,
    is_active: boolean,
}


export interface QuoteDocumentsResponseData extends ResponseData {
    id: number,
    data: QuoteDocument
}

export interface QuoteDocumentsCollectionResponse extends CollectionResponse {
    data: Array<QuoteDocumentsResponseData>
}

export interface CreateQuoteDocumentAttributes {
    name: string,
}