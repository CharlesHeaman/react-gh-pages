import getPaginationParams, { PaginationSearchParams } from '../../../utils/getPaginationParams';
import getVehicleAdvancedSearchParams, { VehiclesAdvancedSearchParams } from '../VehicleListPage/utils/getVehicleAdvancedSearchParam';

export interface VehicleSearchParams extends PaginationSearchParams, VehiclesAdvancedSearchParams {
    registration_number_or_make_or_model_or_user_full_name_like: string | null,
    is_active: string | null
}

const getVehicleSearchParams = (searchParams: URLSearchParams): VehicleSearchParams => {
    const prefix = "vehicles";
    const paginationParams = getPaginationParams(searchParams, prefix)
    const search = searchParams.get(`${prefix}_search`);
    const isActive = searchParams.get(`${prefix}_is_active`);
    const advancedParams = getVehicleAdvancedSearchParams(searchParams);
    
    return {
        ...paginationParams,
        registration_number_or_make_or_model_or_user_full_name_like: search,
        is_active: isActive,
        ...advancedParams
    }
}

export default getVehicleSearchParams