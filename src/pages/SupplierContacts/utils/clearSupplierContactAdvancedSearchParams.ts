const clearSupplierContactAdvancedSearchParams = (searchParams: URLSearchParams, setSearchParams: (searchParams: URLSearchParams) => void) => {
    searchParams.delete('supplier_contacts_email_like');
    searchParams.delete('supplier_contacts_telephone_like');
    searchParams.delete('supplier_contacts_mobile_like');
    setSearchParams(searchParams);

}

export default clearSupplierContactAdvancedSearchParams