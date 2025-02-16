import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { PostCompletionChangeRequestResponseData } from "../../types/postCompletionChangeRequets.types"
import { TicketResponseData } from "../../types/tickets.types"
import PostCompletionChangeRequestActions from "./components/Actions/PostCompletionChangeRequestActions"
import PostCompletionChangeRequestAssociatedData from "./components/PostCompletionChangeRequestAssociatedData"
import PostCompletionChangeRequestSideBarSkeleton from "./components/PostCompletionChangeRequestSideBar"
import { PostCompletionChangeRequestActivityCollectionResponse } from "../../types/postCompletionChangeRequestActivity.types"
import getAPI from "../../utils/getAPI"
import ExportResource from "../CustomerAdmin/Contacts/ContactPage/components/ContactSideBar/components/ContactDeactivate/ExportResource"


const PostCompletionChangeRequestSideBar = (props: {
    postCompletionChangeRequest: PostCompletionChangeRequestResponseData | undefined,
    ticket: TicketResponseData | undefined,
    setRequestData: Dispatch<SetStateAction<PostCompletionChangeRequestResponseData | undefined>>
}) => {
    const [isActivityLoading, setIsActivityLoading] = useState(true);
    const [activityData, setActivityData] = useState<PostCompletionChangeRequestActivityCollectionResponse>();

    useEffect(() => {
        if (props.postCompletionChangeRequest?.id === undefined) return;
        getActivity(props.postCompletionChangeRequest.id);
    }, [JSON.stringify(props.postCompletionChangeRequest)]);

    const getActivity = (postCompletionChangeRequestID: number) => {
        getAPI(`post_completion_change_request_activity`, {
            post_completion_change_request_id: postCompletionChangeRequestID,
            perPage: 1
        }, (response: any) => {
            const postCompletionChangeRequestActivityData: PostCompletionChangeRequestActivityCollectionResponse = response.data;
            setActivityData(postCompletionChangeRequestActivityData);
        }, setIsActivityLoading)    
    } 

    const isSideBarLoading = (
        isActivityLoading
    )

    const canAccept = (
        props.postCompletionChangeRequest?.data.status === 0 &&
        !props.ticket?.data.is_invoice_requested
    );

    return (
        !isSideBarLoading && props.postCompletionChangeRequest && props.ticket && activityData ? 
            <>
                {props.postCompletionChangeRequest.data.status === 0 && <PostCompletionChangeRequestActions
                    requestID={props.postCompletionChangeRequest.id}
                    canAccept={canAccept}
                    setRequestData={props.setRequestData}
                />}
                <PostCompletionChangeRequestAssociatedData
                    postCompletionChangeRequestID={props.postCompletionChangeRequest.id}
                    activityCount={activityData.total_count}
                />
                <ExportResource
                    resourceData={props.postCompletionChangeRequest}
                    resourceName='Post Completion Change Request'
                />
            </> 
            // Skeleton
            :
            <PostCompletionChangeRequestSideBarSkeleton/>

    )
}

export default PostCompletionChangeRequestSideBar