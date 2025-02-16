export interface ResponseData {
    data: any
    id: number | string,
    object: string,
    url: string,
    data_updated_at: Date,
}

export interface PagesResponse {
    next_url: string | null,
    previous_url: string | null,
    per_page: number
}

export interface CollectionResponse {
    object: string,
    url: string,
    pages: PagesResponse,
    total_count: number,
    data_updated_at: Date,
    data: any
}