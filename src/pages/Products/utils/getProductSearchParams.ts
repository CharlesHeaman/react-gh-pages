import getPaginationParams, { PaginationSearchParams } from "../../../utils/getPaginationParams";
import getProductAdvancedSearchParams, { ProductAdvancedSearchParams } from "./getProductAdvancedSearchParams";

export interface ProductSearchParams extends PaginationSearchParams, ProductAdvancedSearchParams {
    description_or_catalogue_number_like: string | null,
    is_active: string | null,
    is_sundry: string | null,
    is_stock: string | null,
}

const getProductSearchParams = (searchParams: URLSearchParams): ProductSearchParams => {
    const paginationParams = getPaginationParams(searchParams, 'products');
    const search = searchParams.get(`products_search`);
    const isActive = searchParams.get(`products_is_active`);
    const isSundry = searchParams.get(`products_is_sundry`);
    const isStock = searchParams.get(`products_is_stock`);
    const advancedParams = getProductAdvancedSearchParams(searchParams);
     
    return {
        ...paginationParams,
        description_or_catalogue_number_like: search,
        is_active: isActive,
        is_sundry: isSundry,
        is_stock: isStock,
        ...advancedParams
    }
}

export default getProductSearchParams