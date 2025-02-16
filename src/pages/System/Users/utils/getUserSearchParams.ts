import getPaginationParams, { PaginationSearchParams } from '../../../../utils/getPaginationParams';

export interface UserSearchParams extends PaginationSearchParams {
    full_name_like: string | null,
    is_active: string | null,
}

const getUserSearchParams = (searchParams: URLSearchParams): UserSearchParams => {
    const search = searchParams.get(`users_search`);
    const isActive = searchParams.get(`users_is_active`);
    const paginationParams = getPaginationParams(searchParams, 'users');

    return {
        ...paginationParams,
        full_name_like: search,
        is_active: isActive,
    }
}

export default getUserSearchParams