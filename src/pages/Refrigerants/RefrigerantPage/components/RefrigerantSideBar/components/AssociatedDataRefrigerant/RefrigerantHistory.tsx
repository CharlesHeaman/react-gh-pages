import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import WindowOverlay from "../../../../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import { RefrigerantActivityCollectionResponse } from "../../../../../../../types/refrigerantActivity.types";
import getAPI from "../../../../../../../utils/getAPI";
import getPaginationParams from "../../../../../../../utils/getPaginationParams";
import RefrigerantActivityList from "./RefrigerantActivityList";


const RefrigerantHistory = (props: {
    refrigerantID: number,
    totalCount: number,
    show: boolean,
    hideFunc: () => void
}) => {
    const [searchParams] = useSearchParams();

    // Data States
    const [isActivityLoading, setIsActivityLoading] = useState(true);
    const [activityData, setActivityData] = useState<RefrigerantActivityCollectionResponse>();

    // Search Parameters
    const paginationParams = getPaginationParams(searchParams, 'refrigerant_activity');

    useEffect(() => {
        getActivity();
    }, [JSON.stringify(paginationParams), props.refrigerantID])

    const getActivity = () => {
        getAPI(`refrigerant_activity`, {
            ...paginationParams,
            refrigerant_id: props.refrigerantID
        }, (response: any) => {
            const refrigerantActivityData: RefrigerantActivityCollectionResponse = response.data;
            setActivityData(refrigerantActivityData);
        }, setIsActivityLoading)    
    } 
    return (
        <WindowOverlay 
            title="Refrigerant History"
            show={props.show}
            hideFunc={props.hideFunc}
            maxWidth={600}        
            top
        >
            <RefrigerantActivityList
                isRefrigerantActivityLoading={isActivityLoading}
                refrigerantActivity={activityData}
                perPage={paginationParams.perPage}
                totalCount={props.totalCount}
            />
        </WindowOverlay>
    )
}

export default RefrigerantHistory