import { useEffect, useState } from "react";
import DashboardWidget from "../../../components/ui/DashboardWidget/DashboardWidget";
import { PostCompletionChangeRequestCollectionResponse } from "../../../types/postCompletionChangeRequets.types";
import getAPI from "../../../utils/getAPI";

const UnprocessedChangeRequestWidget = (props: {
    departmentID?: number | null,
}) => {
    // Data States
    const [isRequestsLoading, setIsRequestsLoading] = useState(true);
    const [postCompletionChangeRequestsData, setPostCompletionChangeRequestsData] = useState<PostCompletionChangeRequestCollectionResponse>();

    useEffect(() => {
        if (props.departmentID === undefined) return
        getEngineerEquipmentDetails();
    }, [props.departmentID]);

    const getEngineerEquipmentDetails = () => {
        getAPI('post_completion_change_requests', {
            department_ids: props.departmentID ? [props.departmentID] : undefined,
            statuses: [0],
            perPage: 1
        }, (response: any) => {
            const postCompletionChangeRequestsData: PostCompletionChangeRequestCollectionResponse = response.data;
            setPostCompletionChangeRequestsData(postCompletionChangeRequestsData);
        }, setIsRequestsLoading);
    }

    return (
        <DashboardWidget 
            title="Post-completion Change Requests"
            count={postCompletionChangeRequestsData?.total_count}
            text="Requests that haven't been processed." 
            iconFont={"restart_alt"}
            to="post_completion_change_requests?post_completion_change_requests_is_pending=true"
        />
    )
}

export default UnprocessedChangeRequestWidget;