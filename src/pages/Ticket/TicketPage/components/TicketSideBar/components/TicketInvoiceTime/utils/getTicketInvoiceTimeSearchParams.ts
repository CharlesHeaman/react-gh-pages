import getPaginationParams, { PaginationSearchParams } from "../../../../../../../../utils/getPaginationParams";

export interface TicketInvoiceTimeSearchParams extends PaginationSearchParams {
    full_name_like: string | null,
}

const getTicketInvoiceTimeSearchParams = (searchParams: URLSearchParams): TicketInvoiceTimeSearchParams => {
    const search = searchParams.get(`ticket_invoice_time_search`);
    const paginationParams = getPaginationParams(searchParams, 'ticket_invoice_time');

    return {
        ...paginationParams,
        full_name_like: search,
    }
}

export default getTicketInvoiceTimeSearchParams