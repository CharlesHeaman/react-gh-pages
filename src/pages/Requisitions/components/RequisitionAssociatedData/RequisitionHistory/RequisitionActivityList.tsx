import { useEffect, useState } from "react";
import PaginationNavigation from "../../../../../components/ui/PaginationNavigation/PaginationNavigation";
import SearchTable from "../../../../../components/ui/SearchTable/SearchTable";
import { RequisitionActivityCollectionResponse } from "../../../../../types/requisitionActivity.types";
import { UserResponseData, UserCollectionResponse } from "../../../../../types/user.types";
import findUser from "../../../../../utils/findUser";
import getAPI from "../../../../../utils/getAPI";
import BasicActivityRowSkeleton from "../../../../Vehicles/VehiclePage/components/components/VehicleAssociatedResources/components/VehicleActivityRowSkeleton";
import RequisitionActivityRow from "./RequisitionActivityRow";

const RequisitionActivityList = (props: {
    isRequisitionActivityLoading: boolean,
    requisitionActivity: RequisitionActivityCollectionResponse | undefined,
    perPage: number,
    totalCount: number
}) => {
    // Data States
    const [isUsersLoading, setIsUsersLoading] = useState(true);
    const [userData, setUserData] = useState<Array<UserResponseData>>([]);

    // Resource Constants
    const resourceName = "requisition history";
    const resourceIcon = "history";

    useEffect(() => {
        setIsUsersLoading(true);
    }, [props.isRequisitionActivityLoading])

    useEffect(() => {
        if (props.requisitionActivity && props.requisitionActivity.data.length > 0) {
            getUsers([...new Set(props.requisitionActivity.data.map(refrigerantMovement => refrigerantMovement.data.created_by_id))]);
        } else {
            setIsUsersLoading(false);
        }
    }, [props.requisitionActivity])

    const getUsers = (userIDs: Array<number | null>) => {
        getAPI('users', {
            ids: userIDs
        }, (response: any) => {
            const userData: UserCollectionResponse = response.data;
            setUserData(userData.data)
        }, setIsUsersLoading)
    }

    const isLoading = (
        props.isRequisitionActivityLoading ||
        isUsersLoading
    )

    return (
        <div>
            <SearchTable 
                headers={['Action', 'Performed By', 'Date']} 
                skeletonRow={<BasicActivityRowSkeleton/>} 
                skeletonCount={Math.min(props.perPage, props.totalCount)} 
                count={props.requisitionActivity ? props.requisitionActivity.data.length : 0} 
                resourceName={resourceName} 
                resourceIconFont={resourceIcon}
                isLoading={!(!isLoading && props.requisitionActivity)}
                body={props.requisitionActivity && props.requisitionActivity.data.map((requisitionActivity, index) => 
                    <RequisitionActivityRow
                        requisitionActivity={requisitionActivity}
                        user={findUser(userData, requisitionActivity.data.created_by_id)}
                        key={index}
                    />
                )}
            />
            {(!isLoading && props.requisitionActivity) && <PaginationNavigation
                data={props.requisitionActivity.data}
                totalCount={props.requisitionActivity.total_count}
                perPage={props.requisitionActivity.pages.per_page}
                resourceName={resourceName}
                prefix="requisition_history"
            />}
        </div>
    )
}

export default RequisitionActivityList