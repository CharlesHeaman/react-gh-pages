const clearSiteAdvancedSearchParams = (searchParams: URLSearchParams, setSearchParams: (searchParams: URLSearchParams) => void) => {
    searchParams.delete('sites_department_id');
    searchParams.delete('sites_code_like');
    searchParams.delete('sites_name_like');
    searchParams.delete('sites_address_like');
    searchParams.delete('sites_postcode_like');
    searchParams.delete('sites_telephone_like');
    searchParams.delete('sites_location_like');
    searchParams.delete('sites_description_like');
    setSearchParams(searchParams);

}

export default clearSiteAdvancedSearchParams