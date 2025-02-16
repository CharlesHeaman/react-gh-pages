import getPaginationParams, { PaginationSearchParams } from "../../../utils/getPaginationParams";

export interface RefrigerantMovementSearchParams extends PaginationSearchParams {
}

const getRefrigerantMovementSearchParams = (searchParams: URLSearchParams): RefrigerantMovementSearchParams => {
    const paginationParams = getPaginationParams(searchParams, 'refrigerant_movements');

    return {
        ...paginationParams,
    }
}

export default getRefrigerantMovementSearchParams