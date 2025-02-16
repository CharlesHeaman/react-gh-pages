import { CollectionResponse, ResponseData } from "./response.types"

export interface CreditNote {
    created_by_id: number,
    department_id: number,
    credit_note_number: string,
    credit_note_date: Date,
    credit_note_value: number,
}

export interface CreditNoteResponseData extends ResponseData {
    id: number,
    data: CreditNote
}

export interface  CreditNoteCollectionResponse extends CollectionResponse {
    data: Array<CreditNoteResponseData>
}