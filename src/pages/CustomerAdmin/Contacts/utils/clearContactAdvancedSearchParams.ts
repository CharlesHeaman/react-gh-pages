const clearContactAdvancedSearchParams = (searchParams: URLSearchParams, setSearchParams: (searchParams: URLSearchParams) => void) => {
    searchParams.delete('contacts_email_like');
    searchParams.delete('contacts_telephone_like');
    searchParams.delete('contacts_mobile_like');
    setSearchParams(searchParams);

}

export default clearContactAdvancedSearchParams