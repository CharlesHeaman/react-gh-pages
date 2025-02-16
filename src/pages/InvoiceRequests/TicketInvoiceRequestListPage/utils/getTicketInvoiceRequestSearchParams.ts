import getPaginationParams, { PaginationSearchParams } from './../../../../utils/getPaginationParams';
import getTicketInvoiceRequestAdvancedSearchParams, { TicketInvoiceRequestAdvancedSearchParams } from './getTicketInvoiceRequestAdvancedSearchParams';

export interface TicketInvoiceRequestSearchParams extends PaginationSearchParams, TicketInvoiceRequestAdvancedSearchParams {
    id: string | null,
    is_processed: string | null,
    is_holding: string | null,
    is_approved: string | null,
}

const getTicketInvoiceRequestSearchParams = (searchParams: URLSearchParams): TicketInvoiceRequestSearchParams => {
    const search = searchParams.get(`ticket_invoice_requests_search`);
    const status = searchParams.get(`ticket_invoice_requests_status`);
    const paginationParams = getPaginationParams(searchParams, 'ticket_invoice_requests');
    const advancedParams = getTicketInvoiceRequestAdvancedSearchParams(searchParams);

    let isProcessed: string | null = null;
    let isHolding: string | null = null;
    let isApproved: string | null = null;

    if (status === "outstanding") {
        isProcessed = 'false';
        isHolding = 'false';
        isApproved = 'true';
    }
    if (status === "awaiting_approval") {
        isProcessed = 'false';
        isHolding = null;
        isApproved = 'false';
    }
    if (status === "holding") {
        isProcessed = 'false';
        isHolding = 'true';
        isApproved = 'true';
    }

    return {
        ...paginationParams,
        id: search,
        is_processed: isProcessed,
        is_holding: isHolding,
        is_approved: isApproved,
        ...advancedParams
    }
}

export default getTicketInvoiceRequestSearchParams