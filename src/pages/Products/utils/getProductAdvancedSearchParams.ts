export interface ProductAdvancedSearchParams {
    size_or_model_like?: string,
    category_id?: string,
    supplier_id?: string,
    manufacturer_id?: string,
    catalogue_number_like?: string,
    part_number_like?: string,
}

const getProductAdvancedSearchParams = (searchParams: URLSearchParams): ProductAdvancedSearchParams => {
    const sizeOrModelLike = searchParams.get('products_size_or_model_like');
    const categoryID = searchParams.get('products_category_id');
    const supplierID = searchParams.get('products_supplier_id');
    const manufacturerID = searchParams.get('products_manufacturer_id');
    const catalogueNumberLike = searchParams.get('products_catalogue_number_like');
    const part_number_like = searchParams.get('products_part_number_like');

    return {
        size_or_model_like: sizeOrModelLike ? sizeOrModelLike : undefined,
        category_id: categoryID ? categoryID : undefined,
        supplier_id: supplierID ? supplierID : undefined,
        manufacturer_id: manufacturerID ? manufacturerID : undefined,
        catalogue_number_like: catalogueNumberLike ? catalogueNumberLike : undefined,
        part_number_like: part_number_like ? part_number_like : undefined,
    }
}

export default getProductAdvancedSearchParams