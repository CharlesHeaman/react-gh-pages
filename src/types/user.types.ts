import { CollectionResponse, ResponseData } from "./response.types"

export interface User {
    username: string,
    user_code: string, 
    first_name: string,
    last_name: string,
    job_title: string,
    email: string,
    email_footer: string
    department_id: number | null,
    mobile: string,
    tracker_home_site_id: string | null,
    is_engineer: boolean,
    is_active: boolean,
    is_timegrid_engineer: boolean,
    address: string,
    postcode: string,
    notes: string | null,
    rate: number,
    over_time_rate: number,
    mileage_rate: number,
    is_diary_engineer: boolean,
    intercompany_rate_1: number,
    intercompany_rate_2: number,
    coordinates: Coordinates | null,
    permissions: Permissions
}

interface Coordinates {
    lat: number,
    lng: number
}

interface Permissions {
    can_auth_time: boolean,
    can_search_assets: boolean,
    can_search_stock: boolean,
    can_search_tickets: boolean,
    can_search_gas_bottles: boolean,
    can_assign_gas_bottles: boolean,
    accounts: number,
    calendars: number,
    customers: number,
    engineer_assets: number,
    engineer_data: number,
    quotes: number,
    rams: number,
    stock: number,
    system: number,
    templates: number,
    tickets: number,
    iso: number
}

export interface UserResponseData extends ResponseData {
    id: number
    data: User
}

export interface  UserCollectionResponse extends CollectionResponse {
    data: Array<UserResponseData>
}

export interface CreateUserAttributes {
    username: string,
    first_name: string,
    last_name: string,
    job_title: string,
    is_engineer: boolean,
    notes: string,
    email: string,
    mobile: string,
    address: string,
    postcode: string,
    coordinates: Coordinates,
}