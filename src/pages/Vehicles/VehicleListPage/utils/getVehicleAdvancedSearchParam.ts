export interface VehiclesAdvancedSearchParams {
    mot_due_date_or_tax_due_date_before?: Date,
}

const getVehicleAdvancedSearchParams = (searchParams: URLSearchParams): VehiclesAdvancedSearchParams => {
    const dueBefore = searchParams.get('vehicles_mot_due_date_or_tax_due_date_before');

    return {
        mot_due_date_or_tax_due_date_before: dueBefore ? new Date(dueBefore) : undefined,

    }
}

export default getVehicleAdvancedSearchParams