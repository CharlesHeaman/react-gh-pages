import getPaginationParams, { PaginationSearchParams } from './../../../../utils/getPaginationParams';
import getContractsAdvancedSearchParams, { ContractsAdvancedSearchParams } from './getContractAdvancedSearchParams';

export interface ContractSearchParams extends PaginationSearchParams, ContractsAdvancedSearchParams {
    reference_number_like: string | null,
    is_active: string | null,
}

const getContractSearchParams = (searchParams: URLSearchParams): ContractSearchParams => {
    const search = searchParams.get(`contracts_search`);
    const isActive = searchParams.get(`contracts_is_active`);
    const paginationParams = getPaginationParams(searchParams, 'contracts');
    const advancedParams = getContractsAdvancedSearchParams(searchParams);

    return {
        ...paginationParams,
        reference_number_like: search,
        is_active: isActive,
        ...advancedParams
    }
}

export default getContractSearchParams