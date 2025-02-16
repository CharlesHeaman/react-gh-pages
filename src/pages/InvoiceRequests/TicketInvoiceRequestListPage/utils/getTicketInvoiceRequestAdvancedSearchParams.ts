export interface TicketInvoiceRequestAdvancedSearchParams {
    department_id?: number,
}

const getTicketInvoiceRequestAdvancedSearchParams = (searchParams: URLSearchParams): TicketInvoiceRequestAdvancedSearchParams => {
    const departmentID = searchParams.get('ticket_invoice_requests_department_id');

    return {
        department_id: departmentID ? parseInt(departmentID) : undefined,
    }
}

export default getTicketInvoiceRequestAdvancedSearchParams