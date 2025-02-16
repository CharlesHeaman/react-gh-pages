import getPaginationParams, { PaginationSearchParams } from './../../../../utils/getPaginationParams';
import getSiteAdvancedSearchParams, { SiteAdvancedSearchParams } from './getSiteAdvancedSearchParams';

export interface SiteSearchParams extends PaginationSearchParams, SiteAdvancedSearchParams {
    code_or_name_like: string | null,
    is_active: string | null,
}

const getSiteSearchParams = (searchParams: URLSearchParams): SiteSearchParams => {
    const search = searchParams.get(`sites_search`);
    const isActive = searchParams.get(`sites_is_active`);
    const paginationParams = getPaginationParams(searchParams, 'sites');
    const advancedParams = getSiteAdvancedSearchParams(searchParams);

    return {
        ...paginationParams,
        code_or_name_like: search,
        is_active: isActive,
        ...advancedParams
    }
}

export default getSiteSearchParams