import getPaginationParams, { PaginationSearchParams } from '../../../utils/getPaginationParams';
import getSupplierContactAdvancedSearchParams, { SupplierContactAdvancedSearchParams } from './SupplierContactAdvancedSearchParams';

export interface SupplierContactSearchParams extends PaginationSearchParams, SupplierContactAdvancedSearchParams {
    name_like: string | null,
    is_active: string | null,
}

const getSupplierContactSearchParams = (searchParams: URLSearchParams): SupplierContactSearchParams => {
    const search = searchParams.get(`supplier_contacts_search`);
    const isActive = searchParams.get(`supplier_contacts_is_active`);
    const paginationParams = getPaginationParams(searchParams, 'supplier_contacts');
    const advancedParams = getSupplierContactAdvancedSearchParams(searchParams);

    return {
        ...paginationParams,
        name_like: search,
        is_active: isActive,
        ...advancedParams
    }
}

export default getSupplierContactSearchParams