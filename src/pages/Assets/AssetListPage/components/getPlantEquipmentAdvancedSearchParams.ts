export interface PlantEquipmentAdvancedSearchParams {
    plant_equipment_type_id?: number,
    assigned_to_user_id?: number,
}

const getPlantEquipmentAdvancedSearchParams = (searchParams: URLSearchParams): PlantEquipmentAdvancedSearchParams => {
    const plantEquipmentTypeID = searchParams.get('plant_equipment_plant_equipment_type_id');
    const assignerToUserID = searchParams.get('plant_equipment_assigned_to_user_id');

    return {
        plant_equipment_type_id: plantEquipmentTypeID ? parseInt(plantEquipmentTypeID) : undefined,
        assigned_to_user_id: assignerToUserID ? parseInt(assignerToUserID) : undefined,
    }
}

export default getPlantEquipmentAdvancedSearchParams