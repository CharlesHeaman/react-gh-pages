import getJobInvoiceRequestAdvancedSearchParams, { JobInvoiceRequestAdvancedSearchParams } from '../JobInvoiceRequestListPage/utils/getJobInvoiceRequestAdvancedSearchParams';
import getPaginationParams, { PaginationSearchParams } from './../../../utils/getPaginationParams';

export interface JobInvoiceRequestSearchParams extends PaginationSearchParams, JobInvoiceRequestAdvancedSearchParams {
    id: string | null,
    is_processed: string | null,
}

const getJobInvoiceRequestSearchParams = (searchParams: URLSearchParams): JobInvoiceRequestSearchParams => {
    const search = searchParams.get(`job_invoice_requests_search`);
    const isProcessed = searchParams.get(`job_invoice_requests_is_processed`);
    const paginationParams = getPaginationParams(searchParams, 'job_invoice_requests');
    const advancedParams = getJobInvoiceRequestAdvancedSearchParams(searchParams);

    return {
        ...paginationParams,
        id: search,
        is_processed: isProcessed,
        ...advancedParams
    }
}

export default getJobInvoiceRequestSearchParams