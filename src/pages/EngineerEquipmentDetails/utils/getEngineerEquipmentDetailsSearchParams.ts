import getPaginationParams, { PaginationSearchParams } from "../../../utils/getPaginationParams";

export interface EngineerEquipmentDetailsSearchParams extends PaginationSearchParams {
    id: string | null,
    is_processed: string | null
}

const getEngineerEquipmentDetailsSearchParams = (searchParams: URLSearchParams): EngineerEquipmentDetailsSearchParams => {
    const prefix = "engineer_equipment_details";
    const paginationParams = getPaginationParams(searchParams, prefix);
    const search = searchParams.get(`${prefix}_search`);
    const isProcessed = searchParams.get(`${prefix}_is_processed`);
    
    return {
        ...paginationParams,
        id: search,
        is_processed: isProcessed,
    }
}

export default getEngineerEquipmentDetailsSearchParams