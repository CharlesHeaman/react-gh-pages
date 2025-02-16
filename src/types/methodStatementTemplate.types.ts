import { CollectionResponse, ResponseData } from "./response.types"

export interface MethodStatementTemplate {
    created_at: Date,
    created_by_id: number,
    content: string,
    is_landscape: boolean,
    template_header_id: number | null,
    template_footer_id: number | null,
    name: string,
    description: string,
    is_active: boolean,
    is_default: boolean
}

export interface MethodStatementTemplateResponseData extends ResponseData {
    id: number,
    data: MethodStatementTemplate
}

export interface  MethodStatementTemplateCollectionResponse extends CollectionResponse {
    data: Array<MethodStatementTemplateResponseData>
}