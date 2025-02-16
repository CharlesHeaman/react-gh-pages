export interface PaginationSearchParams {
    offset: number | null,
    perPage: number,
    orderBy: string | null,
    ascending: boolean
}

const getPaginationParams = (searchParams: URLSearchParams, prefix: string): PaginationSearchParams => {
    const offsetParam = searchParams.get(`${prefix}_offset`);
    const offset = offsetParam ? parseInt(offsetParam) : null;
    const perPageParam = searchParams.get(`${prefix}_per_page`);
    const perPage = perPageParam ? parseInt(perPageParam) : 25;
    const orderBy = searchParams.get(`${prefix}_order_by`);
    const ascending = searchParams.get(`${prefix}_ascending`) === 'true' ? true : false;

    return {
        offset: offset,
        perPage: perPage,
        orderBy: orderBy,
        ascending: ascending
    }
}

export default getPaginationParams