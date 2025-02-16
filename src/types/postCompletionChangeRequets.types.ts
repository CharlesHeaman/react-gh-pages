import { CollectionResponse, ResponseData } from "./response.types"

export interface PostCompletionChangeRequest {
    created_at: Date,
    created_by_id: number,
    response_at: Date | null,
    response_by_id: number | null,
    status: number,
    text: string,
    ticket_id: number,
    ticket_type: number,
}

export interface PostCompletionChangeRequestResponseData extends ResponseData {
    id: number,
    data: PostCompletionChangeRequest
}

export interface PostCompletionChangeRequestCollectionResponse extends CollectionResponse {
    data: Array<PostCompletionChangeRequestResponseData>
}