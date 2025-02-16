import getPaginationParams, { PaginationSearchParams } from "../../../utils/getPaginationParams";

export interface RefrigerantSearchParams extends PaginationSearchParams {
    name_or_common_name_like: string | null,
    is_active: string | null,
}

const getRefrigerantSearchParams = (searchParams: URLSearchParams): RefrigerantSearchParams => {
    const search = searchParams.get(`refrigerants_search`);
    const isActive = searchParams.get(`refrigerants_is_active`);
    const paginationParams = getPaginationParams(searchParams, 'refrigerants');

    return {
        ...paginationParams,
        name_or_common_name_like: search,
        is_active: isActive
    }
}

export default getRefrigerantSearchParams