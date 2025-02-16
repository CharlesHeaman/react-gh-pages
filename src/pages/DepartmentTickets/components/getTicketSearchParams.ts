import getPaginationParams, { PaginationSearchParams } from "../../../utils/getPaginationParams";

export interface TicketSearchParams extends PaginationSearchParams {
    numbers: Array<string> | null,
}

const getTicketSearchParams = (searchParams: URLSearchParams): TicketSearchParams => {
    const number = searchParams.get('tickets_search');
    const paginationParams = getPaginationParams(searchParams, 'tickets');

    return {
        numbers: number ? [number] : null,
        ...paginationParams,
    }
}

export default getTicketSearchParams