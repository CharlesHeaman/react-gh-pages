import { CollectionResponse, ResponseData } from "./response.types"

export interface QuotedEquipment {
    quote_id: number,
    equipment_id: number | null,
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
    visits: Array<QuoteVisits>,
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

export interface QuotedEquipmentResponseData extends ResponseData {
    id: number,
    data: QuotedEquipment
}

export interface  QuotedEquipmentCollectionResponse extends CollectionResponse {
    data: Array<QuotedEquipmentResponseData>
}

export interface EditEquipmentQuoteDetails {
    number_of_engineers: string,
    number_of_mates: string,
    number_of_vans: string,
    is_out_of_hours: boolean,
    is_double_time: boolean,
    mileage: string,
    travel_time: string,
    mileage_rate: number,
}

export interface EditQuoteLabour {
    engineer_index: number,
    is_mate: boolean,
    hours: string,
    is_out_of_hours: boolean,
    is_double_time: boolean,
    rate: number
}

export interface EditQuoteVisits {
    visits: string,
    is_mate: boolean,
    is_out_of_hours: boolean,
    is_double_time: boolean,
    rate: number,
}