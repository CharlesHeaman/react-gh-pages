import getPaginationParams, { PaginationSearchParams } from './../../../../utils/getPaginationParams';

export interface MethodStatementTemplateSearchParams extends PaginationSearchParams {
    name_or_description_like: string | null,
    is_active: string | null,
}

const getMethodStatementTemplateSearchParams = (searchParams: URLSearchParams): MethodStatementTemplateSearchParams => {
    const search = searchParams.get(`method_statement_templates_search`);
    const isActive = searchParams.get(`method_statement_templates_is_active`);
    const paginationParams = getPaginationParams(searchParams, 'method_statement_templates');

    return {
        ...paginationParams,
        name_or_description_like: search,
        is_active: isActive,
    }
}

export default getMethodStatementTemplateSearchParams