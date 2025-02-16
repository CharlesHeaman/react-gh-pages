import { CollectionResponse, ResponseData } from "./response.types"

export interface Asset {
    code: string,
    is_active: boolean,
    manufacturer: string,
    manufacturer_id: number | null,
    model_no: string,
    serial_no: string,
    description: string,
    assigned_to_user_id: number | null,
    location: string,
    next_pa_test: Date | null,
    last_pa_test: Date | null,
    next_calibration_test: Date | null,
    last_calibration_test: Date | null,
    next_maintenance: Date | null,
    last_maintenance: Date | null,
    next_inspection: Date | null,
    last_inspection: Date | null,
    department_id: number | null,
    purchase_order_number: string | null,
    purchase_date: Date | null,
    notes: string | null,
    ownership_type: number,
    requires_pa_test: boolean,
    requires_calibration: boolean,
    requires_maintenance: boolean,
    requires_inspection: boolean,
    pa_test_amps: number | null,
    pa_test_volts: number | null,
    acceptable_tolerance: string | null
    calibrated_externally: boolean,
    maintained_externally: boolean,
    external_maintainer: string | null,
    plant_equipment_type_id: number,
}
export interface AssetResponseData extends ResponseData {
    id: number,
    data: Asset
}

export interface  AssetCollectionResponse extends CollectionResponse {
    data: Array<AssetResponseData>
}

export interface CreateAssetAttributes {
    description: string,
    model_no: string,
    serial_no: string,
    notes: string,
    purchase_order_number: string,
    purchase_date: Date,
    requires_pa_test: boolean,
    requires_calibration: boolean,
    requires_maintenance: boolean,
    requires_inspection: boolean,
    pa_test_volts: string,
    pa_test_amps: string,
    acceptable_tolerance: string,
    calibrated_externally: boolean,
    maintained_externally: boolean,
    external_maintainer: string,
    last_pa_test: Date | null,
    last_calibration_test: Date | null,
    last_maintenance: Date | null,
    last_inspection: Date | null,
    next_pa_test: Date | null,
    next_calibration_test: Date | null,
    next_maintenance: Date | null,
    next_inspection: Date | null,
    location: string,
}
