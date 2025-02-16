import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import WindowOverlay from "../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import { SiteActivityCollectionResponse } from "../../../../types/siteActivity.types";
import getAPI from "../../../../utils/getAPI";
import getPaginationParams from "../../../../utils/getPaginationParams";
import SiteActivityList from "./SiteActivityList";

const SiteHistory = (props: {
    siteID: number,
    totalCount: number,
    show: boolean,
    hideFunc: () => void
}) => {
    const [searchParams] = useSearchParams();

    // Data States
    const [isActivityLoading, setIsActivityLoading] = useState(true);
    const [activityData, setActivityData] = useState<SiteActivityCollectionResponse>();

    // Search Parameters
    const paginationParams = getPaginationParams(searchParams, 'site_history');

    useEffect(() => {
        getActivity();
    }, [JSON.stringify(paginationParams), props.siteID])

    const getActivity = () => {
        getAPI(`site_activity`, {
            ...paginationParams,
            site_id: props.siteID
        }, (response: any) => {
            const siteActivityData: SiteActivityCollectionResponse = response.data;
            setActivityData(siteActivityData);
        }, setIsActivityLoading)    
    } 
    return (
        <WindowOverlay 
            title="Site History"
            show={props.show}
            hideFunc={props.hideFunc}
            maxWidth={600}        
            top
        >
            <SiteActivityList
                isSiteActivityLoading={isActivityLoading}
                siteActivity={activityData}
                perPage={paginationParams.perPage}
                totalCount={props.totalCount}
            />
        </WindowOverlay>
    )
}

export default SiteHistory