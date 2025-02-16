import { CollectionResponse, ResponseData } from "./response.types"

export interface RiskAssessmentMethodStatement {
    created_at: Date,
    created_by_id: number,
    ticket_id: number,
    ticket_type: number,
    pdf_url: string,
    sequence_of_operations: string,
    attached_risk_assessment_ids: Array<number>,
    required_personnel_protective_equipment_ids: Array<number>,
    department_id: number,
}

export interface RiskAssessmentMethodStatementResponseData extends ResponseData {
    id: number,
    data: RiskAssessmentMethodStatement
}

export interface  RiskAssessmentMethodStatementCollectionResponse extends CollectionResponse {
    data: Array<RiskAssessmentMethodStatementResponseData>
}

export interface CreateRiskAssessmentMethodStatement {
    end_date: Date,
}