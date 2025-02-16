import getPaginationParams, { PaginationSearchParams } from './../../../../utils/getPaginationParams';

export interface DescriptionOfWorksSearchParams extends PaginationSearchParams {
    name_like: string | null,
    is_active: string | null,
}

const getDescriptionOfWorksSearchParams = (searchParams: URLSearchParams): DescriptionOfWorksSearchParams => {
    const search = searchParams.get(`description_of_works_search`);
    const isActive = searchParams.get(`description_of_works_is_active`);
    const paginationParams = getPaginationParams(searchParams, 'description_of_works');

    return {
        ...paginationParams,
        name_like: search,
        is_active: isActive,
    }
}

export default getDescriptionOfWorksSearchParams