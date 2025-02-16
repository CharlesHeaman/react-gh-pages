export interface PurchaseOrderAdvancedSearchParams {
    customer_id?: number,
    supplier_id?: number,
}

const getPurchaseOrderAdvancedSearchParams = (searchParams: URLSearchParams): PurchaseOrderAdvancedSearchParams => {
    const customerID = searchParams.get('purchase_orders_customer_id');
    const supplierID = searchParams.get('purchase_orders_supplier_id');

    return {
        customer_id: customerID ? parseInt(customerID) : undefined,
        supplier_id: supplierID ? parseInt(supplierID) : undefined,
    }
}

export default getPurchaseOrderAdvancedSearchParams