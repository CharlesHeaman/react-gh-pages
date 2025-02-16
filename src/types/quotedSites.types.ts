import { CollectionResponse, ResponseData } from "./response.types"

export interface QuotedSite {
    quote_id: number,
    site_id: number | null,
    status: number,
    number_of_engineers: number,
    number_of_mates: number,
    number_of_vans: number,
    is_out_of_hours: boolean,
    is_double_time: boolean,
    mileage: number,
    travel_time: number,
    engineer_rate: number,
    mate_rate: number,
    mileage_rate: number,
    labour: Array<QuoteLabour>,
    visits: Array<QuoteVisits>
    quote_text: string,
}


export interface QuoteLabour {
    engineer_index: number,
    is_mate: boolean,
    hours: number,
    is_out_of_hours: boolean,
    is_double_time: boolean
}

export interface QuoteVisits {
    visits: number,
    is_mate: boolean,
    is_out_of_hours: boolean,
    is_double_time: boolean
}

export interface QuotedSiteResponseData extends ResponseData {
    id: number,
    data: QuotedSite
}

export interface  QuotedSiteCollectionResponse extends CollectionResponse {
    data: Array<QuotedSiteResponseData>
}