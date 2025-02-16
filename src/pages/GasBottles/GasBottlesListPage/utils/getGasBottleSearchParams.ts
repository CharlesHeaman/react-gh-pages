import getGasBottleAdvancedSearchParams, { GasBottleAdvancedSearchParams } from './../components/getGasBottleAdvancedSearchParam';
import getPaginationParams, { PaginationSearchParams } from './../../../../utils/getPaginationParams';

export interface GasBottleSearchParams extends PaginationSearchParams, GasBottleAdvancedSearchParams {
    code_or_number_like: string | null,
    is_assigned: boolean | null,
    is_returned: boolean | null,
    is_decant: string | null,
    is_queued: boolean | null,
}

const getGasBottleSearchParams = (searchParams: URLSearchParams): GasBottleSearchParams => {
    const search = searchParams.get(`gas_bottles_search`);
    const status = searchParams.get(`gas_bottles_status`);
    const isDecant = searchParams.get(`gas_bottles_is_decant`);
    const paginationParams = getPaginationParams(searchParams, 'gas_bottles');
    const advancedParams = getGasBottleAdvancedSearchParams(searchParams);

    return {
        ...paginationParams,
        code_or_number_like: search,
        is_decant: isDecant,
        is_assigned: status === "unassigned" || status === "assigned" || status === "queued" ? status === "assigned" : null,
        is_returned: status === "returned",
        is_queued: status === "queued" || status === "unassigned" ? status === "queued" : null,
        ...advancedParams
    }
}

export default getGasBottleSearchParams