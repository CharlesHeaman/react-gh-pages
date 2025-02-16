import getEquipmentAdvancedSearchParams, { EquipmentAdvancedSearchParams } from '../components/getEquipmentAdvancedSearchParams';
import getPaginationParams, { PaginationSearchParams } from './../../../../utils/getPaginationParams';

export interface EquipmentSearchParams extends PaginationSearchParams, EquipmentAdvancedSearchParams {
    code_or_description_like: string | null,
    is_active: string | null,
}

const getEquipmentSearchParams = (searchParams: URLSearchParams): EquipmentSearchParams => {
    const search = searchParams.get(`equipment_search`);
    const isActive = searchParams.get(`equipment_is_active`);
    const paginationParams = getPaginationParams(searchParams, 'equipment');
    const advancedParams = getEquipmentAdvancedSearchParams(searchParams);

    return {
        ...paginationParams,
        code_or_description_like: search,
        is_active: isActive,
        ...advancedParams
    }
}

export default getEquipmentSearchParams