import { CollectionResponse, ResponseData } from './response.types';
export interface TrackerSite {
    name: string
}

export interface TrackerSiteResponseData extends ResponseData {
    data: TrackerSite
}

export interface TrackerSiteCollectionResponse extends CollectionResponse {
    data: Array<TrackerSiteResponseData>
}