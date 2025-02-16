import getPaginationParams, { PaginationSearchParams } from "../../../utils/getPaginationParams";

export interface PlantEquipmentTypeSearchParams extends PaginationSearchParams {
    name_like: string | null,
    is_active: string | null,
}

const getPlantEquipmentTypeSearchParams = (searchParams: URLSearchParams): PlantEquipmentTypeSearchParams => {
    const search = searchParams.get(`plant_equipment_type_search`);
    const isActive = searchParams.get(`plant_equipment_type_is_active`);
    const paginationParams = getPaginationParams(searchParams, 'plant_equipment_type');

    return {
        ...paginationParams,
        name_like: search,
        is_active: isActive,
    }
}

export default getPlantEquipmentTypeSearchParams