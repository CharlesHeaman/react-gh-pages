import getPaginationParams, { PaginationSearchParams } from "../../../utils/getPaginationParams";

export interface EngineerEquipmentDetailsSearchParams extends PaginationSearchParams {
    id: string | null,
    statuses: Array<number> | null
}

const getPostCompletionChangeRequestSearchParams = (searchParams: URLSearchParams): EngineerEquipmentDetailsSearchParams => {
    const prefix = "post_completion_change_requests";
    const paginationParams = getPaginationParams(searchParams, prefix);
    const search = searchParams.get(`${prefix}_search`);
    const status = searchParams.get(`${prefix}_is_pending`);
    
    return {
        ...paginationParams,
        id: search,
        statuses: status ? [0] : null,
    }
}

export default getPostCompletionChangeRequestSearchParams