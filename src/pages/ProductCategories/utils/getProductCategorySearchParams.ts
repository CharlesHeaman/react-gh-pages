import getPaginationParams, { PaginationSearchParams } from "../../../utils/getPaginationParams";

export interface ProductCategorySearchParams extends PaginationSearchParams {
    name_like: string | null,
    is_active: string | null,
}

const getProductCategorySearchParams = (searchParams: URLSearchParams): ProductCategorySearchParams => {
    const search = searchParams.get(`product_category_search`);
    const isActive = searchParams.get(`product_category_is_active`);
    const paginationParams = getPaginationParams(searchParams, 'product_category');

    return {
        ...paginationParams,
        name_like: search,
        is_active: isActive,
    }
}

export default getProductCategorySearchParams