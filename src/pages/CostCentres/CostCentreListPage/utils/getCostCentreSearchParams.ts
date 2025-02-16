import getPaginationParams, { PaginationSearchParams } from './../../../../utils/getPaginationParams';

export interface CostCentreSearchParams extends PaginationSearchParams {
    name_like: string | null,
    is_active: string | null,
}

const getCostCentreSearchParams = (searchParams: URLSearchParams): CostCentreSearchParams => {
    const search = searchParams.get(`cost_centres_search`);
    const isActive = searchParams.get(`cost_centres_is_active`);
    const paginationParams = getPaginationParams(searchParams, 'cost_centres');

    return {
        ...paginationParams,
        name_like: search,
        is_active: isActive,
    }
}

export default getCostCentreSearchParams