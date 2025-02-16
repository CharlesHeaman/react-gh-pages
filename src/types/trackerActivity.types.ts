import { CollectionResponse, ResponseData } from './response.types';
export interface TrackerActivity {
    date: Date,
    event: string,
    loc: string,
    lat: number,
    lng: number,
    distance: number,
    ignition_on: boolean,
    vehicle_id: string,
    site_id: string
}

export interface TrackerActivityResponseData extends ResponseData {
    data: TrackerActivity
}

export interface TrackerActivityCollectionResponse extends CollectionResponse {
    data: Array<TrackerActivityResponseData>
}