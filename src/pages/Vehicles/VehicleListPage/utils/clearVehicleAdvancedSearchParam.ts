const clearVehicleAdvancedSearchParams = (searchParams: URLSearchParams, setSearchParams: (searchParams: URLSearchParams) => void) => {
    searchParams.delete('vehicles_mot_due_date_or_tax_due_date_before');
    setSearchParams(searchParams);
}

export default clearVehicleAdvancedSearchParams