import { CollectionResponse, ResponseData } from "./response.types"

export interface NonConformanceReport {
    crated_by_id: number,
    created_at: Date,
    type: number,
    customer_id: number | null,
    supplier_manufacturer_id: number | null,
    source: string,
    cause: string,
    corrective_action: string,
    preventive_action: string,
    verification: string,
    reviewed_by_id: number,
    is_closed: boolean,
    reviewed_at: Date,
}

export interface NonConformanceReportResponseData extends ResponseData {
    id: number,
    data: NonConformanceReport
}

export interface  NonConformanceReportCollectionResponse extends CollectionResponse {
    data: Array<NonConformanceReportResponseData>
}

// export interface CreateNonConformanceReportAttributes {
//     name: string,
//     email: string,
//     mobile: string,
//     telephone: string,
//     notes: string,
// }