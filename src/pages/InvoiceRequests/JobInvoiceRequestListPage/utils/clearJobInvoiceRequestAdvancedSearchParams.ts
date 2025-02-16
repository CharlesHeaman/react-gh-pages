const clearJobInvoiceRequestAdvancedSearchParams = (searchParams: URLSearchParams, setSearchParams: (searchParams: URLSearchParams) => void) => {
    searchParams.delete('job_invoice_requests_department_id');
    setSearchParams(searchParams);
}

export default clearJobInvoiceRequestAdvancedSearchParams