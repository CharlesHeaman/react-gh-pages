export interface EquipmentAdvancedSearchParams {
    code_like?: string,
    location_like?: string,
    description_like?: string,
    model_number_like?: string,
    serial_number_like?: string
}

const getEquipmentAdvancedSearchParams = (searchParams: URLSearchParams): EquipmentAdvancedSearchParams => {
    const code_like = searchParams.get('equipment_code_like');
    const location_like = searchParams.get('equipment_location_like');
    const description_like = searchParams.get('equipment_description_like');
    const model_number_like = searchParams.get('equipment_model_number_like');
    const serial_number_like = searchParams.get('equipment_serial_number_like');

    return {
        code_like: code_like ? code_like : undefined,
        location_like: location_like ? location_like : undefined,
        description_like: description_like ? description_like : undefined,
        model_number_like: model_number_like ? model_number_like : undefined,
        serial_number_like: serial_number_like ? serial_number_like : undefined,
    }
}

export default getEquipmentAdvancedSearchParams