import getPaginationParams, { PaginationSearchParams } from './../../../../utils/getPaginationParams';

export interface DepartmentSearchParams extends PaginationSearchParams {
    name_like: string | null,
    is_active: string | null,
}

const getDepartmentSearchParams = (searchParams: URLSearchParams): DepartmentSearchParams => {
    const search = searchParams.get(`departments_search`);
    const isActive = searchParams.get(`departments_is_active`);
    const paginationParams = getPaginationParams(searchParams, 'departments');

    return {
        ...paginationParams,
        name_like: search,
        is_active: isActive,
    }
}

export default getDepartmentSearchParams