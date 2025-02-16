const clearCustomerAdvancedSearchParams = (searchParams: URLSearchParams, setSearchParams: (searchParams: URLSearchParams) => void) => {
    searchParams.delete('customers_code_like');
    searchParams.delete('customers_name_like');
    searchParams.delete('customers_is_contracted');
    searchParams.delete('customers_email_like');
    searchParams.delete('customers_telephone_like');
    searchParams.delete('customers_address_like');
    searchParams.delete('customers_postcode_like');
    searchParams.delete('customers_sage_name_like');
    searchParams.delete('customers_accounts_email_like');
    searchParams.delete('customers_accounts_status');
    setSearchParams(searchParams);

}

export default clearCustomerAdvancedSearchParams