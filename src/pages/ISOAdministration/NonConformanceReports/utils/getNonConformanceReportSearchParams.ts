import getPaginationParams, { PaginationSearchParams } from './../../../../utils/getPaginationParams';

export interface NonConformanceReportSearchParams extends PaginationSearchParams {
    cause_like: string | null,
    is_processed: boolean | null
}

const getNonConformanceReportSearchParams = (searchParams: URLSearchParams): NonConformanceReportSearchParams => {
    const prefix = "non_conformance_reports";
    const search = searchParams.get(`${prefix}_search`);
    const paginationParams = getPaginationParams(searchParams, prefix);
    const isProcessed = searchParams.get(`${prefix}_is_processed`);


    return {
        ...paginationParams,
        cause_like: search,
        is_processed: isProcessed === 'false' ? false : null
    }
}

export default getNonConformanceReportSearchParams