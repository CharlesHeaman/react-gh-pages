const clearPlantEquipmentAdvancedSearchParams = (searchParams: URLSearchParams, setSearchParams: (searchParams: URLSearchParams) => void) => {
    searchParams.delete('plant_equipment_plant_equipment_type_id');
    searchParams.delete('plant_equipment_assigned_to_user_id');
    setSearchParams(searchParams);

}

export default clearPlantEquipmentAdvancedSearchParams