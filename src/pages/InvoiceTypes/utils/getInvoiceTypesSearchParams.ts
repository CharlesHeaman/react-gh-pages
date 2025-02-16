import getPaginationParams, { PaginationSearchParams } from "../../../utils/getPaginationParams";

export interface InvoiceTypesSearchParams extends PaginationSearchParams {
    name_like: string | null,
    is_active: string | null,
}

const getInvoiceTypesSearchParams = (searchParams: URLSearchParams): InvoiceTypesSearchParams => {
    const search = searchParams.get(`invoice_types_search`);
    const isActive = searchParams.get(`invoice_types_is_active`);
    const paginationParams = getPaginationParams(searchParams, 'invoice_types');

    return {
        ...paginationParams,
        name_like: search,
        is_active: isActive,
    }
}

export default getInvoiceTypesSearchParams