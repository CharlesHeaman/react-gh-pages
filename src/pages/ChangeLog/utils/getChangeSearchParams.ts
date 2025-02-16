import getPaginationParams, { PaginationSearchParams } from "../../../utils/getPaginationParams";

export interface ChangeSearchParams extends PaginationSearchParams {
    title_or_text_like: string | null,
    systems: Array<number> | null,
}

const getChangeSearchParams = (searchParams: URLSearchParams): ChangeSearchParams => {
    const search = searchParams.get(`change_search`);
    const systems = searchParams.get(`change_is_active`);
    const paginationParams = getPaginationParams(searchParams, 'change');

    return {
        ...paginationParams,
        title_or_text_like: search,
        systems: systems ? [parseInt(systems)] : null,
    }
}

export default getChangeSearchParams