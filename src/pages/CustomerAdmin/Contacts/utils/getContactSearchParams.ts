import getPaginationParams, { PaginationSearchParams } from './../../../../utils/getPaginationParams';
import getContactAdvancedSearchParams, { ContactAdvancedSearchParams } from './getContactAdvancedSearchParams';

export interface ContactSearchParams extends PaginationSearchParams, ContactAdvancedSearchParams {
    name_like: string | null,
    is_active: string | null,
}

const getContactSearchParams = (searchParams: URLSearchParams): ContactSearchParams => {
    const search = searchParams.get(`contacts_search`);
    const isActive = searchParams.get(`contacts_is_active`);
    const paginationParams = getPaginationParams(searchParams, 'contacts');
    const advancedParams = getContactAdvancedSearchParams(searchParams);

    return {
        ...paginationParams,
        name_like: search,
        is_active: isActive,
        ...advancedParams
    }
}

export default getContactSearchParams