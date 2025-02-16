import { CollectionResponse, ResponseData } from "./response.types"

export interface TemplateHeader {
    created_at: Date,
    created_by_id: number,
    name: string,
    description: string | null,
    image_url: string | null,
    alignment: number,
    is_active: boolean
}

export interface TemplateHeaderResponseData extends ResponseData {
    id: number,
    data: TemplateHeader
}

export interface  TemplateHeaderCollectionResponse extends CollectionResponse {
    data: Array<TemplateHeaderResponseData>
}