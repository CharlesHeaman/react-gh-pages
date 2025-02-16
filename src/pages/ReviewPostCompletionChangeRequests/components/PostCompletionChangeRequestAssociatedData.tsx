import { useState } from "react"
import SideBarButton from "../../../components/ui/Buttons/SideBarButton/SideBarButton";
import SideBarModule from "../../../components/ui/Containers/SideBarModule/SideBarModule";
import PostCompletionChangeRequestHistory from "./PostCompletionChangeRequestHistory";

const PostCompletionChangeRequestAssociatedData = (props: {
    postCompletionChangeRequestID: number,
    activityCount: number,
}) => {
    const [showHistory, setShowHistory] = useState(false);

    return (
        <>
            <SideBarModule title='Post-completion Change Request'>
                <SideBarButton
                    text={`History (${props.activityCount})`}
                    iconFont="history"
                    clickEvent={() => setShowHistory(true)}
                />
            </SideBarModule>

            <PostCompletionChangeRequestHistory
                postCompletionChangeRequestID={props.postCompletionChangeRequestID}
                show={showHistory}
                hideFunc={() => setShowHistory(false)}
                totalCount={props.activityCount}
            />
        </>
    )
}

export default PostCompletionChangeRequestAssociatedData