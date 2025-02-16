import getPaginationParams, { PaginationSearchParams } from './../../../../utils/getPaginationParams';
import getCustomerAdvancedSearchParams, { CustomerAdvancedSearchParams } from './getCustomerAdvancedSearchParams';

export interface CustomerSearchParams extends PaginationSearchParams, CustomerAdvancedSearchParams {
    code_or_name_like: string | null,
    is_active: string | null
}

const getCustomerSearchParams = (searchParams: URLSearchParams): CustomerSearchParams => {
    const prefix = "customers";
    const paginationParams = getPaginationParams(searchParams, prefix);
    const search = searchParams.get(`${prefix}_search`);
    const isActive = searchParams.get(`${prefix}_is_active`);
    const advancedParams = getCustomerAdvancedSearchParams(searchParams);
    
    return {
        ...paginationParams,
        code_or_name_like: search,
        is_active: isActive,
        ...advancedParams,
    }
}

export default getCustomerSearchParams