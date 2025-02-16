import { useState, useEffect } from "react";
import PaginationNavigation from "../../../../../../../components/ui/PaginationNavigation/PaginationNavigation";
import SearchTable from "../../../../../../../components/ui/SearchTable/SearchTable";
import { RefrigerantActivityCollectionResponse } from "../../../../../../../types/refrigerantActivity.types";
import { UserResponseData, UserCollectionResponse } from "../../../../../../../types/user.types";
import findUser from "../../../../../../../utils/findUser";
import getAPI from "../../../../../../../utils/getAPI";
import BasicActivityRowSkeleton from "../../../../../../Vehicles/VehiclePage/components/components/VehicleAssociatedResources/components/VehicleActivityRowSkeleton";
import RefrigerantActivityRow from "./RefrigerantActivityRow";


const RefrigerantActivityList = (props: {
    isRefrigerantActivityLoading: boolean,
    refrigerantActivity: RefrigerantActivityCollectionResponse | undefined,
    perPage: number,
    totalCount: number
}) => {
    // Data States
    const [isUsersLoading, setIsUsersLoading] = useState(true);
    const [userData, setUserData] = useState<Array<UserResponseData>>([]);

    // Resource Constants
    const resourceName = "refrigerant history";
    const resourceIcon = "history";

    useEffect(() => {
        setIsUsersLoading(true);
    }, [props.isRefrigerantActivityLoading])

    useEffect(() => {
        if (props.refrigerantActivity && props.refrigerantActivity.data.length > 0) {
            getUsers([...new Set(props.refrigerantActivity.data.map(refrigerantMovement => refrigerantMovement.data.created_by_id))]);
        } else {
            setIsUsersLoading(false);
        }
    }, [props.refrigerantActivity])

    const getUsers = (userIDs: Array<number | null>) => {
        getAPI('users', {
            ids: userIDs
        }, (response: any) => {
            const userData: UserCollectionResponse = response.data;
            setUserData(userData.data)
        }, setIsUsersLoading)
    }

    const isLoading = (
        props.isRefrigerantActivityLoading ||
        isUsersLoading
    )

    return (
        <div>
            <SearchTable 
                headers={['Action', 'Performed By', 'Date']} 
                skeletonRow={<BasicActivityRowSkeleton/>} 
                skeletonCount={Math.min(props.perPage, props.totalCount)} 
                count={props.refrigerantActivity ? props.refrigerantActivity.data.length : 0} 
                resourceName={resourceName} 
                resourceIconFont={resourceIcon}
                isLoading={!(!isLoading && props.refrigerantActivity)}
                body={props.refrigerantActivity && props.refrigerantActivity.data.map((refrigerantActivity, index) => 
                    <RefrigerantActivityRow
                        refrigerantActivity={refrigerantActivity}
                        user={findUser(userData, refrigerantActivity.data.created_by_id)}
                        key={index}
                    />
                )}
            />
            {(!isLoading && props.refrigerantActivity) && <PaginationNavigation
                data={props.refrigerantActivity.data}
                totalCount={props.refrigerantActivity.total_count}
                perPage={props.refrigerantActivity.pages.per_page}
                resourceName={resourceName}
                prefix="refrigerant_history"
            />}
        </div>
    )
}

export default RefrigerantActivityList