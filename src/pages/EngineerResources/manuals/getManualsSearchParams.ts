import getPaginationParams, { PaginationSearchParams } from "../../../utils/getPaginationParams";

export interface ManualsSearchParams extends PaginationSearchParams {
    name_like: string | null,
    is_active: string | null,
}

const getManualsSearchParams = (searchParams: URLSearchParams): ManualsSearchParams => {
    const prefix = "manuals";
    const paginationParams = getPaginationParams(searchParams, prefix);
    const search = searchParams.get(`${prefix}_search`);
    const isActive = searchParams.get(`${prefix}_is_active`);
    
    return {
        ...paginationParams,
        name_like: search,
        is_active: isActive
    }
}

export default getManualsSearchParams