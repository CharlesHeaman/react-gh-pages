const clearProductAdvancedSearchParams = (searchParams: URLSearchParams, setSearchParams: (searchParams: URLSearchParams) => void) => {
    searchParams.delete('products_size_or_model_like');
    searchParams.delete('products_category_id');
    searchParams.delete('products_manufacturer_id');
    searchParams.delete('products_supplier_id');
    searchParams.delete('products_catalogue_number_like');
    searchParams.delete('products_part_number_like');
    setSearchParams(searchParams);

}

export default clearProductAdvancedSearchParams