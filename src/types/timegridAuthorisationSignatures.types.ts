import { CollectionResponse, ResponseData } from "./response.types"

export interface TimegridAuthorisationSignature {
    user_id: number,
    timegrid_id: number,
    date: Date
}

export interface TimegridAuthorisationSignatureResponseData extends ResponseData {
    id: number
    data: TimegridAuthorisationSignature
}

export interface  TimegridAuthorisationSignatureCollectionResponse extends CollectionResponse {
    data: Array<TimegridAuthorisationSignatureResponseData>
}