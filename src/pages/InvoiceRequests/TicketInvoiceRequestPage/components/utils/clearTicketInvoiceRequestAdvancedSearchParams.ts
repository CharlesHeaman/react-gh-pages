const clearTicketInvoiceRequestAdvancedSearchParams = (searchParams: URLSearchParams, setSearchParams: (searchParams: URLSearchParams) => void) => {
    searchParams.delete('ticket_invoice_request_department_id');
    setSearchParams(searchParams);
}

export default clearTicketInvoiceRequestAdvancedSearchParams