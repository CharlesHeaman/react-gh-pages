import { ResponseData } from "./response.types"

export interface SystemConfigs {
    required_timegrid_authorisation_signatures: number,
    tracker_work_site_id: string | null,
    mileage_cost_rate: number
    bottle_returns_seed: number,
    bottled_seed: number,
    plant_tools_seed: number,
    requisition_seed: number,
    default_gas_supplier_id: number | null,
    refrigerant_product_category_id: number | null
}

export interface SystemConfigsResponseData extends ResponseData {
    data: SystemConfigs
}
