import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import WindowOverlay from "../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import { PostCompletionChangeRequestActivityCollectionResponse } from "../../../types/postCompletionChangeRequestActivity.types";
import getAPI from "../../../utils/getAPI";
import getPaginationParams from "../../../utils/getPaginationParams";
import PostCompletionChangeRequestActivityList from "./PostCompletionChangeRequestActivityList";

const PostCompletionChangeRequestHistory = (props: {
    postCompletionChangeRequestID: number,
    totalCount: number,
    show: boolean,
    hideFunc: () => void
}) => {
    const [searchParams] = useSearchParams();

    // Data States
    const [isActivityLoading, setIsActivityLoading] = useState(true);
    const [activityData, setActivityData] = useState<PostCompletionChangeRequestActivityCollectionResponse>();

    // Search Parameters
    const paginationParams = getPaginationParams(searchParams, 'post_completion_change_request_activity');

    useEffect(() => {
        getActivity();
    }, [JSON.stringify(paginationParams), props.postCompletionChangeRequestID])

    const getActivity = () => {
        getAPI(`post_completion_change_request_activity`, {
            ...paginationParams,
            post_completion_change_request_id: props.postCompletionChangeRequestID
        }, (response: any) => {
            const postCompletionChangeRequestActivityData: PostCompletionChangeRequestActivityCollectionResponse = response.data;
            setActivityData(postCompletionChangeRequestActivityData);
        }, setIsActivityLoading)    
    } 
    return (
        <WindowOverlay 
            title="Engineer Equipment Details History"
            show={props.show}
            hideFunc={props.hideFunc}
            maxWidth={600}        
            top
        >
            <PostCompletionChangeRequestActivityList
                isPostCompletionChangeRequestActivityLoading={isActivityLoading}
                postCompletionChangeRequestActivity={activityData}
                perPage={paginationParams.perPage}
                totalCount={props.totalCount}
            />
        </WindowOverlay>
    )
}

export default PostCompletionChangeRequestHistory