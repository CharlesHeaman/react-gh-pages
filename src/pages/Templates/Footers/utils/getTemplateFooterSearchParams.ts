import getPaginationParams, { PaginationSearchParams } from './../../../../utils/getPaginationParams';

export interface TemplateFooterSearchParams extends PaginationSearchParams {
    name_or_description_like: string | null,
    is_active: string | null,
}

const getTemplateFooterSearchParams = (searchParams: URLSearchParams): TemplateFooterSearchParams => {
    const search = searchParams.get(`template_footers_search`);
    const isActive = searchParams.get(`template_footers_is_active`);
    const paginationParams = getPaginationParams(searchParams, 'template_footers');

    return {
        ...paginationParams,
        name_or_description_like: search,
        is_active: isActive,
    }
}

export default getTemplateFooterSearchParams