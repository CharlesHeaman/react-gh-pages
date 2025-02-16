import getPaginationParams, { PaginationSearchParams } from "../../../utils/getPaginationParams";

export interface RequisitionSearchParams extends PaginationSearchParams {
    number_like: string | null,
    is_complete: string | null,
}

const getRequisitionSearchParams = (searchParams: URLSearchParams): RequisitionSearchParams => {
    const search = searchParams.get(`requisitions_search`);
    const isComplete = searchParams.get(`requisitions_is_complete`);
    const paginationParams = getPaginationParams(searchParams, 'requisitions');

    return {
        ...paginationParams,
        is_complete: isComplete,
        number_like: search,
    }
}

export default getRequisitionSearchParams