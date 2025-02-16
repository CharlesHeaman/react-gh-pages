import { CollectionResponse, ResponseData } from "./response.types"

export interface RiskAssessmentAttachment {
    created_at: Date,
    created_by_id: number,
    description_of_works_id: number,
    risk_assessment_id: number,
}

export interface RiskAssessmentAttachmentResponseData extends ResponseData {
    id: number,
    data: RiskAssessmentAttachment
}

export interface  RiskAssessmentAttachmentCollectionResponse extends CollectionResponse {
    data: Array<RiskAssessmentAttachmentResponseData>
}