import getPaginationParams, { PaginationSearchParams } from "../../../utils/getPaginationParams";

export interface EquipmentTypeSearchParams extends PaginationSearchParams {
    name_like: string | null,
    is_active: string | null,
}

const getEquipmentTypeSearchParams = (searchParams: URLSearchParams): EquipmentTypeSearchParams => {
    const search = searchParams.get(`equipment_types_search`);
    const isActive = searchParams.get(`equipment_types_is_active`);
    const paginationParams = getPaginationParams(searchParams, 'equipment_types');

    return {
        ...paginationParams,
        name_like: search,
        is_active: isActive,
    }
}

export default getEquipmentTypeSearchParams