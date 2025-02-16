import getPaginationParams, { PaginationSearchParams } from "../../../utils/getPaginationParams";

export interface SupplierManufacturerSearchParams extends PaginationSearchParams {
    code_or_name_like: string | null,
    is_active: string | null,
    is_approved: string | null
}

const getSupplierManufacturerSearchParams = (searchParams: URLSearchParams): SupplierManufacturerSearchParams => {
    const prefix = "suppliers_manufacturers";
    const paginationParams = getPaginationParams(searchParams, prefix)
    const search = searchParams.get(`${prefix}_search`);
    const isActive = searchParams.get(`${prefix}_is_active`);
    const isApproved = searchParams.get(`${prefix}_is_approved`);
    
    return {
        ...paginationParams,
        code_or_name_like: search,
        is_active: isActive,
        is_approved: isApproved
    }
}

export default getSupplierManufacturerSearchParams