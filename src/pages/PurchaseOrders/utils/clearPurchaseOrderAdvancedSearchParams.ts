const clearPurchaseOrderAdvancedSearchParams = (searchParams: URLSearchParams, setSearchParams: (searchParams: URLSearchParams) => void) => {
    searchParams.delete('purchase_orders_customer_id');
    searchParams.delete('purchase_orders_supplier_id');
    setSearchParams(searchParams);
}

export default clearPurchaseOrderAdvancedSearchParams