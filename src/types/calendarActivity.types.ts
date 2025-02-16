import { CollectionResponse, ResponseData } from "./response.types"

export interface CalendarActivity {
    name: string,
    description: string,
    label_color: string | null
}

export interface CalendarActivityResponseData extends ResponseData {
    id: number
    data: CalendarActivity
}

export interface  CalendarActivityCollectionResponse extends CollectionResponse {
    data: Array<CalendarActivityResponseData>
}