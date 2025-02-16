import { useState, useEffect } from "react";
import PaginationNavigation from "../../../components/ui/PaginationNavigation/PaginationNavigation";
import SearchTable from "../../../components/ui/SearchTable/SearchTable";
import { PostCompletionChangeRequestActivityCollectionResponse } from "../../../types/postCompletionChangeRequestActivity.types";
import { UserResponseData, UserCollectionResponse } from "../../../types/user.types";
import findUser from "../../../utils/findUser";
import getAPI from "../../../utils/getAPI";
import BasicActivityRowSkeleton from "../../Vehicles/VehiclePage/components/components/VehicleAssociatedResources/components/VehicleActivityRowSkeleton";
import PostCompletionChangeRequestActivityRow from "./PostCompletionChangeRequestActivityRow";

const PostCompletionChangeRequestActivityList = (props: {
    isPostCompletionChangeRequestActivityLoading: boolean,
    postCompletionChangeRequestActivity: PostCompletionChangeRequestActivityCollectionResponse | undefined,
    perPage: number,
    totalCount: number
}) => {
    // Data States
    const [isUsersLoading, setIsUsersLoading] = useState(true);
    const [userData, setUserData] = useState<Array<UserResponseData>>([]);

    // Resource Constants
    const resourceName = "post-completion change request history";
    const resourceIcon = "history";

    useEffect(() => {
        setIsUsersLoading(true);
    }, [props.isPostCompletionChangeRequestActivityLoading])

    useEffect(() => {
        if (props.postCompletionChangeRequestActivity && props.postCompletionChangeRequestActivity.data.length > 0) {
            getUsers([...new Set(props.postCompletionChangeRequestActivity.data.map(refrigerantMovement => refrigerantMovement.data.created_by_id))]);
        } else {
            setIsUsersLoading(false);
        }
    }, [props.postCompletionChangeRequestActivity])

    const getUsers = (userIDs: Array<number | null>) => {
        getAPI('users', {
            ids: userIDs
        }, (response: any) => {
            const userData: UserCollectionResponse = response.data;
            setUserData(userData.data)
        }, setIsUsersLoading)
    }

    const isLoading = (
        props.isPostCompletionChangeRequestActivityLoading ||
        isUsersLoading
    )

    return (
        <div>
            <SearchTable 
                headers={['Action', 'Performed By', 'Date']} 
                skeletonRow={<BasicActivityRowSkeleton/>} 
                skeletonCount={Math.min(props.perPage, props.totalCount)} 
                count={props.postCompletionChangeRequestActivity ? props.postCompletionChangeRequestActivity.data.length : 0} 
                resourceName={resourceName} 
                resourceIconFont={resourceIcon}
                isLoading={!(!isLoading && props.postCompletionChangeRequestActivity)}
                body={props.postCompletionChangeRequestActivity && props.postCompletionChangeRequestActivity.data.map((postCompletionChangeRequestActivity, index) => 
                    <PostCompletionChangeRequestActivityRow
                        postCompletionChangeRequestActivity={postCompletionChangeRequestActivity}
                        user={findUser(userData, postCompletionChangeRequestActivity.data.created_by_id)}
                        key={index}
                    />
                )}
            />
            {(!isLoading && props.postCompletionChangeRequestActivity) && <PaginationNavigation
                totalCount={props.postCompletionChangeRequestActivity.total_count}
                perPage={props.postCompletionChangeRequestActivity.pages.per_page}
                resourceName={resourceName}
                prefix="post_completion_change_request_history"
            />}
        </div>
    )
}

export default PostCompletionChangeRequestActivityList