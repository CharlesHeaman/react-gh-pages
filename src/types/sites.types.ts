import { CollectionResponse, ResponseData } from "./response.types"

export interface Site {
    name: string,
    code: string,
    location: string,
    description: string,
    address: string,
    postcode: string,
    customer_id: number,
    coordinates: Coordinates | null,
    is_active: boolean,
    department_id: number,
    telephone?: string | null,
    contract_id: number | null,
    special_instructions: string | null,
}

export interface Coordinates {
    lat: number,
    lng: number
}

export interface SiteResponseData extends ResponseData {
    id: number,
    data: Site
}

export interface  SiteCollectionResponse extends CollectionResponse {
    data: Array<SiteResponseData>
}

export interface CreateSiteAttributes {
    name: string,
    code: string,
    location: string,
    description: string,
    address: string,
    postcode: string,
    coordinates: Coordinates,
    telephone: string,
    special_instructions: string,
}