import { CollectionResponse, ResponseData } from "./response.types"

export interface VehicleDocuments {
    vehicle_id: number,
    created_by_id: number,
    created_at: Date,
    name: string,
    file_name: string,
    is_active: boolean,
    type: number
}

export interface VehicleDocumentsResponseData extends ResponseData {
    id: number,
    data: VehicleDocuments
}

export interface VehicleDocumentsCollectionResponse extends CollectionResponse {
    data: Array<VehicleDocumentsResponseData>
}

export interface CreateVehicleDocumentAttributes {
    name: string,
}
