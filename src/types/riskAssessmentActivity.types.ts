import { CollectionResponse, ResponseData } from "./response.types";

export interface RiskAssessmentActivity {
    created_at: Date,
    created_by_id: number,
    risk_assessment_id: number,
    activity_name: string,
    person_at_risk: string,
    significant_hazards: string,
    risk_likelihood: number,
    risk_severity: number,
    risk_control_measures: string,
    residual_risk_likelihood: number,
    residual_risk_severity: number,
}

export interface RiskAssessmentActivityResponseData extends ResponseData {
    id: number,
    data: RiskAssessmentActivity,
}

export interface RiskAssessmentActivityCollectionResponse extends CollectionResponse {
    data: Array<RiskAssessmentActivityResponseData>,
}