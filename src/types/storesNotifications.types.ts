import { CollectionResponse, ResponseData } from "./response.types"

export interface StoresNotification {
    created_at: Date,
    created_by_id: number,
    status: number,
    text: string,
    ticket_id: number,
    ticket_type: number,
}

export interface StoresNotificationResponseData extends ResponseData {
    id: number
    data: StoresNotification
}

export interface  StoresNotificationCollectionResponse extends CollectionResponse {
    data: Array<StoresNotificationResponseData>
}