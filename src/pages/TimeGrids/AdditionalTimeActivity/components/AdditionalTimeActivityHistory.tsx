import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import WindowOverlay from "../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import { AdditionalTimeActivityActivityCollectionResponse } from "../../../../types/additionalTimeActivityActivity.types";
import getAPI from "../../../../utils/getAPI";
import getPaginationParams from "../../../../utils/getPaginationParams";
import AdditionalTimeActivityActivityList from "./AdditionalTimeActivityActivityList";

const AdditionalTimeActivityHistory = (props: {
    additionalTimeActivityID: number,
    totalCount: number,
    show: boolean,
    hideFunc: () => void
}) => {
    const [searchParams] = useSearchParams();

    // Data States
    const [isActivityLoading, setIsActivityLoading] = useState(true);
    const [activityData, setActivityData] = useState<AdditionalTimeActivityActivityCollectionResponse>();

    // Search Parameters
    const paginationParams = getPaginationParams(searchParams, 'additional_time_activity_history');

    useEffect(() => {
        getActivity();
    }, [JSON.stringify(paginationParams), props.additionalTimeActivityID])

    const getActivity = () => {
        getAPI(`additional_time_activity_activity`, {
            ...paginationParams,
            additional_time_activity_id: props.additionalTimeActivityID
        }, (response: any) => {
            const additionalTimeActivityActivityData: AdditionalTimeActivityActivityCollectionResponse = response.data;
            setActivityData(additionalTimeActivityActivityData);
        }, setIsActivityLoading)    
    } 
    return (
        <WindowOverlay 
            title="Additional Time Activity History"
            show={props.show}
            hideFunc={props.hideFunc}
            maxWidth={600}        
            top
        >
            <AdditionalTimeActivityActivityList
                isAdditionalTimeActivityActivityLoading={isActivityLoading}
                additionalTimeActivityActivity={activityData}
                perPage={paginationParams.perPage}
                totalCount={props.totalCount}
            />
        </WindowOverlay>
    )
}

export default AdditionalTimeActivityHistory
