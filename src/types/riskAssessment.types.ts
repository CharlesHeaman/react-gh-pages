import { CollectionResponse, ResponseData } from "./response.types"

export interface RiskAssessment {
    created_at: Date,
    created_by_id: number,
    name: string,
    is_active: boolean,
    risk_assessment_template_id: number | null,
    last_review_at: Date | null,
    next_review_at: Date | null,
}

export interface RiskAssessmentResponseData extends ResponseData {
    id: number,
    data: RiskAssessment
}

export interface  RiskAssessmentCollectionResponse extends CollectionResponse {
    data: Array<RiskAssessmentResponseData>
}