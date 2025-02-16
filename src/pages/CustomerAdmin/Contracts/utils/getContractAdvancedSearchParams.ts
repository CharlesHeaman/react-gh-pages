export interface ContractsAdvancedSearchParams {
    value_greater_than?: string,
    value_less_than?: string,
    start_before?: string,
    start_after?: string,
    end_before?: string,
    end_after?: string,
    purchase_order_number_like?: string,
    department_id?: number
}

const getContractsAdvancedSearchParams = (searchParams: URLSearchParams): ContractsAdvancedSearchParams => {
    const value_greater_than = searchParams.get('contracts_value_greater_than');
    const value_less_than = searchParams.get('contracts_value_less_than');
    const start_before = searchParams.get('contracts_start_before');
    const start_after = searchParams.get('contracts_start_after');
    const end_before = searchParams.get('contracts_end_before');
    const end_after = searchParams.get('contracts_end_after');
    const purchase_order_number_like = searchParams.get('contracts_purchase_order_number_like');
    const department_id = searchParams.get('contracts_department_id');

    return {
        value_greater_than: value_greater_than ? value_greater_than : undefined,
        value_less_than: value_less_than ? value_less_than : undefined,
        start_before: start_before ? start_before : undefined,
        start_after: start_after ? start_after : undefined,
        end_before: end_before ? end_before : undefined,
        end_after: end_after ? end_after : undefined,
        purchase_order_number_like: purchase_order_number_like ? purchase_order_number_like : undefined,
        department_id: department_id ? parseInt(department_id) : undefined,
    }
}

export default getContractsAdvancedSearchParams