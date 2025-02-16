import getPlantEquipmentAdvancedSearchParams, { PlantEquipmentAdvancedSearchParams } from './../AssetListPage/components/getPlantEquipmentAdvancedSearchParams';
import getPaginationParams, { PaginationSearchParams } from "../../../utils/getPaginationParams";

export interface PlantEquipmentSearchParams extends PaginationSearchParams, PlantEquipmentAdvancedSearchParams {
    description_like: string | null,
    is_active: string | null,
    requires_pa_test: boolean | null,
    requires_calibration: boolean | null,
    requires_inspection: boolean | null,
    requires_maintenance: boolean | null,
}

const getPlantEquipmentSearchParams = (searchParams: URLSearchParams): PlantEquipmentSearchParams => {
    const prefix = "plant_equipment";
    const paginationParams = getPaginationParams(searchParams, prefix);
    const search = searchParams.get(`${prefix}_search`);
    const isActive = searchParams.get(`${prefix}_is_active`);
    const type = searchParams.get(`${prefix}_type`);
    const advancedParams = getPlantEquipmentAdvancedSearchParams(searchParams);

    return {
        ...paginationParams,
        description_like: search,
        is_active: isActive,
        requires_pa_test: type !== null ? type === "pat" : null,
        requires_calibration: type !== null ? type === "calibration" : null,
        requires_inspection: type !== null ? type === "inspection" : null,
        requires_maintenance: type !== null ? type === "maintenance" : null,
        ...advancedParams
    }
}

export default getPlantEquipmentSearchParams