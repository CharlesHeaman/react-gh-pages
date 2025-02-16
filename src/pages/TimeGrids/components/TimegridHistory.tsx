import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom";
import WindowOverlay from "../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import { TimegridActivityCollectionResponse } from "../../../types/timegridActivity.types";
import getAPI from "../../../utils/getAPI";
import getPaginationParams from "../../../utils/getPaginationParams";
import TimegridActivityList from "./TimegridActivityList";

const TimegridHistory = (props: {
    timegridID: number,
    totalCount: number,
    show: boolean,
    hideFunc: () => void
}) => {
    const [searchParams] = useSearchParams();

    // Data States
    const [isActivityLoading, setIsActivityLoading] = useState(true);
    const [activityData, setActivityData] = useState<TimegridActivityCollectionResponse>();

    // Search Parameters
    const paginationParams = getPaginationParams(searchParams, 'timegrid_history');

    useEffect(() => {
        getActivity();
    }, [JSON.stringify(paginationParams), props.timegridID])

    const getActivity = () => {
        getAPI(`timegrid_activity`, {
            ...paginationParams,
            timegrid_id: props.timegridID
        }, (response: any) => {
            const timegridActivityData: TimegridActivityCollectionResponse = response.data;
            setActivityData(timegridActivityData);
        }, setIsActivityLoading)    
    } 
    return (
        <WindowOverlay 
            title="Timegrid History"
            show={props.show}
            hideFunc={props.hideFunc}
            maxWidth={600}        
            top
        >
            <TimegridActivityList
                isTimegridActivityLoading={isActivityLoading}
                timegridActivity={activityData}
                perPage={paginationParams.perPage}
                totalCount={props.totalCount}
            />
        </WindowOverlay>
    )
}

export default TimegridHistory