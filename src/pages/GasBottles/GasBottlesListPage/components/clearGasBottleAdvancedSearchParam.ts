const clearGasBottleAdvancedSearchParams = (searchParams: URLSearchParams, setSearchParams: (searchParams: URLSearchParams) => void) => {
    searchParams.delete('gas_bottles_refrigerant_id');
    searchParams.delete('gas_bottles_supplier_id');
    searchParams.delete('gas_bottles_rental_end_before');
    searchParams.delete('gas_bottles_assigned_to_id');
    setSearchParams(searchParams);
}

export default clearGasBottleAdvancedSearchParams