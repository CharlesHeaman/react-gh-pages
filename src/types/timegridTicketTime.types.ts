import { CollectionResponse, ResponseData } from "./response.types"

export interface TimegridTicketTime {
    expenses: number,
    is_own_miles: boolean,
    mileage: number,
    on_site_time: number,
    ticket_id: number,
    ticket_type: number,
    travel_time: number,
    user_id: number,
}


export interface TimegridTicketTimeResponseData extends ResponseData {
    data: TimegridTicketTime
}

export interface TimegridTicketTimeCollectionResponse extends CollectionResponse {
    data: Array<TimegridTicketTimeResponseData>
}