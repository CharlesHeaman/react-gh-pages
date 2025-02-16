import { CollectionResponse, ResponseData } from "./response.types"

export interface RiskAssessmentTemplate {
    name: string,
    description: string,
    created_at: Date,
    created_by_id: number,
    content: string,
    is_landscape: boolean,
    template_header_id: number | null,
    template_footer_id: number | null,
    is_active: boolean,
    is_default: boolean,
}

export interface RiskAssessmentTemplateResponseData extends ResponseData {
    id: number,
    data: RiskAssessmentTemplate
}

export interface  RiskAssessmentTemplateCollectionResponse extends CollectionResponse {
    data: Array<RiskAssessmentTemplateResponseData>
}