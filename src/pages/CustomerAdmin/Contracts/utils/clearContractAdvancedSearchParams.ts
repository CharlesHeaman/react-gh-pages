const clearContactAdvancedSearchParams = (searchParams: URLSearchParams, setSearchParams: (searchParams: URLSearchParams) => void) => {
    searchParams.delete('contracts_value_greater_than');
    searchParams.delete('contracts_value_less_than');
    searchParams.delete('contracts_start_before');
    searchParams.delete('contracts_start_after');
    searchParams.delete('contracts_end_before');
    searchParams.delete('contracts_end_after');
    searchParams.delete('contracts_purchase_order_number_like');
    setSearchParams(searchParams);
}

export default clearContactAdvancedSearchParams