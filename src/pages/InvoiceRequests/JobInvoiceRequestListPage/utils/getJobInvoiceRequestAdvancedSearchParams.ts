export interface JobInvoiceRequestAdvancedSearchParams {
    department_id?: number,
}

const getJobInvoiceRequestAdvancedSearchParams = (searchParams: URLSearchParams): JobInvoiceRequestAdvancedSearchParams => {
    const departmentID = searchParams.get('job_invoice_requests_department_id');

    return {
        department_id: departmentID ? parseInt(departmentID) : undefined,
    }
}

export default getJobInvoiceRequestAdvancedSearchParams