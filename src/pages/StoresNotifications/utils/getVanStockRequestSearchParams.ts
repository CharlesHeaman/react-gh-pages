import getPaginationParams, { PaginationSearchParams } from "../../../utils/getPaginationParams";

export interface VanStockRequestSearchParams extends PaginationSearchParams {
    id: string | null,
    status: string | null,
}

const getVanStockRequestSearchParams = (searchParams: URLSearchParams): VanStockRequestSearchParams => {
    const search = searchParams.get(`stores_notifications_search`);
    const status = searchParams.get(`stores_notifications_status`);
    const paginationParams = getPaginationParams(searchParams, 'stores_notifications');

    return {
        ...paginationParams,
        id: search,
        status: status,
    }
}

export default getVanStockRequestSearchParams