import getPaginationParams, { PaginationSearchParams } from '../../utils/getPaginationParams';

export interface TimegridSearchParams extends PaginationSearchParams {
    full_name_like: string | null,
    is_active: string | null,
}

const getTimegridSearchParams = (searchParams: URLSearchParams): TimegridSearchParams => {
    const search = searchParams.get(`timegrids_search`);
    const isActive = searchParams.get(`timegrids_is_active`);
    const paginationParams = getPaginationParams(searchParams, 'timegrids');

    return {
        ...paginationParams,
        full_name_like: search,
        is_active: isActive,
    }
}

export default getTimegridSearchParams