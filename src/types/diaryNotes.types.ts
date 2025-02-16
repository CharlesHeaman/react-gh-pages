import { CollectionResponse, ResponseData } from "./response.types"

export interface DiaryNote {
    date: Date
    created_by_id: number
    text: string
    is_important: boolean,
    department_id: number | null,
}

export interface DiaryNoteResponseData extends ResponseData {
    data: DiaryNote
}

export interface  DiaryNoteCollectionResponse extends CollectionResponse {
    data: Array<DiaryNoteResponseData>
}

export interface  CreateDiaryNoteAttributes {
    date: Date,
    text: string,
    is_important: boolean,
    is_all_departments: boolean,
}