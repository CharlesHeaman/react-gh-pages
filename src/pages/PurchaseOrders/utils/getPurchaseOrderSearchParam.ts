import getPaginationParams, { PaginationSearchParams } from "../../../utils/getPaginationParams";
import getPurchaseOrderAdvancedSearchParams, { PurchaseOrderAdvancedSearchParams } from "./getPurchaseOrderAdvancedSearchParams";

export interface PurchaseOrderSearchParams extends PaginationSearchParams, PurchaseOrderAdvancedSearchParams {
    id: string | null,
    is_outstanding: string | null,
    is_sent: string | null,
}

const getPurchaseOrderSearchParams = (searchParams: URLSearchParams): PurchaseOrderSearchParams => {
    const search = searchParams.get(`purchase_orders_search`);
    const status = searchParams.get(`purchase_orders_status`);
    const paginationParams = getPaginationParams(searchParams, 'purchase_orders');
    const advancedParams = getPurchaseOrderAdvancedSearchParams(searchParams);


    return {
        ...paginationParams,
        id: search,
        is_outstanding: status === "outstanding" ? 'true' : null,
        is_sent: status === "unsent" ? 'false' : status === "outstanding" ? 'true' : null,
        ...advancedParams
    }
}

export default getPurchaseOrderSearchParams