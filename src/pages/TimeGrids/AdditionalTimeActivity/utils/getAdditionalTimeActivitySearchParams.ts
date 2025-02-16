import getPaginationParams, { PaginationSearchParams } from '../../../../utils/getPaginationParams';

export interface AdditionalTimeActivitySearchParams extends PaginationSearchParams {
    name_like: string | null,
    is_active: string | null,
}

const getAdditionalTimeActivitySearchParams = (searchParams: URLSearchParams): AdditionalTimeActivitySearchParams => {
    const search = searchParams.get(`additional_time_activity_search`);
    const isActive = searchParams.get(`additional_time_activity_is_active`);
    const paginationParams = getPaginationParams(searchParams, 'additional_time_activity');

    return {
        ...paginationParams,
        name_like: search,
        is_active: isActive,
    }
}

export default getAdditionalTimeActivitySearchParams