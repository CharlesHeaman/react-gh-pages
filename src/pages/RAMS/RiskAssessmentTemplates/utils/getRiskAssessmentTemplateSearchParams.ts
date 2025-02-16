import getPaginationParams, { PaginationSearchParams } from './../../../../utils/getPaginationParams';

export interface RiskAssessmentTemplateSearchParams extends PaginationSearchParams {
    name_or_description_like: string | null,
    is_active: string | null,
}

const getRiskAssessmentTemplateSearchParams = (searchParams: URLSearchParams): RiskAssessmentTemplateSearchParams => {
    const search = searchParams.get(`risk_assessment_templates_search`);
    const isActive = searchParams.get(`risk_assessment_templates_is_active`);
    const paginationParams = getPaginationParams(searchParams, 'risk_assessment_templates');

    return {
        ...paginationParams,
        name_or_description_like: search,
        is_active: isActive,
    }
}

export default getRiskAssessmentTemplateSearchParams