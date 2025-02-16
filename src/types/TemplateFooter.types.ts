import { CollectionResponse, ResponseData } from "./response.types"

export interface TemplateFooter {
    created_at: Date,
    created_by_id: number,
    name: string,
    description: string | null,
    image_url: string,
    alignment: number,
    is_active: boolean
}

export interface TemplateFooterResponseData extends ResponseData {
    id: number,
    data: TemplateFooter
}

export interface  TemplateFooterCollectionResponse extends CollectionResponse {
    data: Array<TemplateFooterResponseData>
}