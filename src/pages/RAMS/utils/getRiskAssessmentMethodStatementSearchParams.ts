import getPaginationParams, { PaginationSearchParams } from "../../../utils/getPaginationParams";

export interface RiskAssessmentMethodStatementSearchParams extends PaginationSearchParams {
    file_name_like: string | null,
    is_active: string | null,
}

const getRiskAssessmentMethodStatementSearchParams = (searchParams: URLSearchParams): RiskAssessmentMethodStatementSearchParams => {
    const search = searchParams.get(`rams_search`);
    const isActive = searchParams.get(`rams_is_active`);
    const paginationParams = getPaginationParams(searchParams, 'rams');

    return {
        ...paginationParams,
        file_name_like: search,
        is_active: isActive,
    }
}

export default getRiskAssessmentMethodStatementSearchParams