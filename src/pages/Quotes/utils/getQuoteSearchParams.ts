import getPaginationParams, { PaginationSearchParams } from "../../../utils/getPaginationParams";

export interface QuoteSearchParams extends PaginationSearchParams {
    number_or_customer_like: string | null,
    statuses: Array<number> | null,
}

const getQuoteSearchParams = (searchParams: URLSearchParams): QuoteSearchParams => {
    const search = searchParams.get(`quotes_search`);
    const status = searchParams.get(`quotes_status`);
    const jobStatus = searchParams.get(`quotes_job_status`);
    const statuses = status === "open" ? [2] : status === "sent" ? [0] : status === "awaiting_approval" ? [-1] : jobStatus === "open" ? [1] : null;
    const paginationParams = getPaginationParams(searchParams, 'quotes');

    return {
        ...paginationParams,
        number_or_customer_like: search,
        statuses: statuses,
    }
}

export default getQuoteSearchParams