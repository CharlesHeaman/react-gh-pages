import { CollectionResponse, ResponseData } from "./response.types"

export interface Changelog {
    date: Date,
    type: number,
    title: string,
    text: string,
    system: number,
}

export interface ChangelogResponseData extends ResponseData {
    data: Changelog
}

export interface ChangelogCollectionResponse extends CollectionResponse {
    data: Array<ChangelogResponseData>
}