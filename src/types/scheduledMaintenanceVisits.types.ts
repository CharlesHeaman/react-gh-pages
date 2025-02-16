import { CollectionResponse, ResponseData } from "./response.types"

export interface ScheduledMaintenanceVisits {
    contract_id: number,
    visit_number: number,
    visit_date: Date,
    is_created: boolean,
}

export interface ScheduledMaintenanceVisitsResponseData extends ResponseData {
    id: number
    data: ScheduledMaintenanceVisits
}

export interface  ScheduledMaintenanceVisitsCollectionResponse extends CollectionResponse {
    data: Array<ScheduledMaintenanceVisitsResponseData>
}
