import { CollectionResponse, ResponseData } from "./response.types"

export interface PostCompletionChangeRequestActivity {
    post_completion_change_request_id: number,
    type: number,
    created_at: Date,
    created_by_id: number,
}

export interface PostCompletionChangeRequestActivityResponseData extends ResponseData {
    id: number
    data: PostCompletionChangeRequestActivity
}

export interface  PostCompletionChangeRequestActivityCollectionResponse extends CollectionResponse {
    data: Array<PostCompletionChangeRequestActivityResponseData>
}
