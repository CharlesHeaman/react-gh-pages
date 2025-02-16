import { CollectionResponse, ResponseData } from "./response.types"

export interface Refrigerant {
    name: string,
    common_name: string,
    is_active: boolean,
    global_warming_potential: number,
    notes: string | null,
    is_consumable: boolean,
    product_id: number | null,
}

export interface RefrigerantResponseData extends ResponseData {
    id: number,
    data: Refrigerant
}

export interface  RefrigerantCollectionResponse extends CollectionResponse {
    data: Array<RefrigerantResponseData>
}

export interface CreateRefrigerantAttributes {
    name: string,
    common_name: string,
    global_warming_potential: string,
    notes: string,
}