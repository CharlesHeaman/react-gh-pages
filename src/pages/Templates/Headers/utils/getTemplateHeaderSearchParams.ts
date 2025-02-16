import getPaginationParams, { PaginationSearchParams } from './../../../../utils/getPaginationParams';

export interface TemplateHeaderSearchParams extends PaginationSearchParams {
    name_or_description_like: string | null,
    is_active: string | null,
}

const getTemplateHeaderSearchParams = (searchParams: URLSearchParams): TemplateHeaderSearchParams => {
    const search = searchParams.get(`template_headers_search`);
    const isActive = searchParams.get(`template_headers_is_active`);
    const paginationParams = getPaginationParams(searchParams, 'template_headers');

    return {
        ...paginationParams,
        name_or_description_like: search,
        is_active: isActive,
    }
}

export default getTemplateHeaderSearchParams