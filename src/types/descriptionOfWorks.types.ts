import { CollectionResponse, ResponseData } from "./response.types"

export interface DescriptionOfWorks {
    created_at: Date,
    created_by_id: number,
    description: string,
    is_active: boolean,
    name: string,
    sequence_of_operations: string,
    department_id: number,
    last_review_at: Date | null,
    next_review_at: Date | null,
}

export interface DescriptionOfWorksResponseData extends ResponseData {
    id: number,
    data: DescriptionOfWorks
}

export interface  DescriptionOfWorksCollectionResponse extends CollectionResponse {
    data: Array<DescriptionOfWorksResponseData>
}