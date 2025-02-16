export interface GasBottleAdvancedSearchParams {
    refrigerant_id?: number,
    assigned_to_id?: number,
    supplier_id?: number,
    rental_end_before?: Date
}

const getGasBottleAdvancedSearchParams = (searchParams: URLSearchParams): GasBottleAdvancedSearchParams => {
    const refrigerantID = searchParams.get('gas_bottles_refrigerant_id');
    const supplierID = searchParams.get('gas_bottles_supplier_id');
    const rentalEndDate = searchParams.get('gas_bottles_rental_end_before');
    const assignerToUserID = searchParams.get('gas_bottles_assigned_to_id');

    return {
        refrigerant_id: refrigerantID ? parseInt(refrigerantID) : undefined,
        supplier_id: supplierID ? parseInt(supplierID) : undefined,
        rental_end_before: rentalEndDate ? new Date(rentalEndDate) : undefined,
        assigned_to_id: assignerToUserID ? parseInt(assignerToUserID) : undefined,
    }
}

export default getGasBottleAdvancedSearchParams