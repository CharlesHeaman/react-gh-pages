import { CollectionResponse, ResponseData } from "./response.types"

export interface ScheduleOfWorks {
    created_at: Date,
    created_by_id: number,
    name: string,
    upload_url: string,
    is_active: boolean
}

export interface ScheduleOfWorksResponseData extends ResponseData {
    id: number,
    data: ScheduleOfWorks
}

export interface  ScheduleOfWorksCollectionResponse extends CollectionResponse {
    data: Array<ScheduleOfWorksResponseData>
}