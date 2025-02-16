import { CollectionResponse, ResponseData } from "./response.types"

export interface SiteListNote {
    ticket_id: number,
    equipment_id: number
    report: string,
    customer_viewable_report: string | null,
    is_report_complete: boolean,
    is_work_required: boolean,
    is_fgas_checked: boolean,
    is_gas_safety_checked: boolean
}

export interface SiteListNoteResponseData extends ResponseData {
    id: number,
    data: SiteListNote
}

export interface  SiteListNoteCollectionResponse extends CollectionResponse {
    data: Array<SiteListNoteResponseData>
}

export interface EditSiteListNoteAttributes {
    site_list_note_id: number,
    customer_viewable_report: string,
}