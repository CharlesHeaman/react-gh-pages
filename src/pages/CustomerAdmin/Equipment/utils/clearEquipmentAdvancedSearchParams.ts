const clearEquipmentAdvancedSearchParams = (searchParams: URLSearchParams, setSearchParams: (searchParams: URLSearchParams) => void) => {
    searchParams.delete('equipment_code_like');
    searchParams.delete('equipment_location_like');
    searchParams.delete('equipment_description_like');
    searchParams.delete('equipment_model_number_like');
    searchParams.delete('equipment_serial_number_like');
    setSearchParams(searchParams);

}

export default clearEquipmentAdvancedSearchParams