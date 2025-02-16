import getPaginationParams, { PaginationSearchParams } from "./getPaginationParams";

export interface DocumentSearchParams extends PaginationSearchParams {
    is_active: string | null
}

const getDocumentSearchParams = (searchParams: URLSearchParams, prefix: string): DocumentSearchParams => {
    const paginationParams = getPaginationParams(searchParams, `${prefix}_documents`);
    const isActive = searchParams.get(`${prefix}_documents_is_active`);
    
    return {
        ...paginationParams,
        is_active: isActive,
    }
}

export default getDocumentSearchParams