import { CollectionResponse, ResponseData } from "./response.types"

export interface CalendarRecord {
    user_id: number,
    created_by_id: number,
    calendar_event_id: number,
    created_at: Date,
    day_part: number,
    date: Date,
}

export interface CalendarRecordResponseData extends ResponseData {
    id: number
    data: CalendarRecord
}

export interface  CalendarRecordCollectionResponse extends CollectionResponse {
    data: Array<CalendarRecordResponseData>
}

export interface  CreateCalendarRecordAttributes {
    start_date: Date,
    end_date: Date,
}