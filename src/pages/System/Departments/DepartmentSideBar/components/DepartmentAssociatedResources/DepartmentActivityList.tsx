import { useEffect, useState } from "react";
import PaginationNavigation from "../../../../../../components/ui/PaginationNavigation/PaginationNavigation";
import SearchTable from "../../../../../../components/ui/SearchTable/SearchTable";
import { DepartmentActivityCollectionResponse } from "../../../../../../types/departmentActivity.types";
import { UserResponseData, UserCollectionResponse } from "../../../../../../types/user.types";
import findUser from "../../../../../../utils/findUser";
import getAPI from "../../../../../../utils/getAPI";
import BasicActivityRowSkeleton from "../../../../../Vehicles/VehiclePage/components/components/VehicleAssociatedResources/components/VehicleActivityRowSkeleton";
import DepartmentActivityRow from "./DepartmentActivityRow";


const DepartmentActivityList = (props: {
    isDepartmentActivityLoading: boolean,
    departmentActivity: DepartmentActivityCollectionResponse | undefined,
    perPage: number,
    totalCount: number
}) => {
    // Data States
    const [isUsersLoading, setIsUsersLoading] = useState(true);
    const [userData, setUserData] = useState<Array<UserResponseData>>([]);

    // Resource Constants
    const resourceName = "department history";
    const resourceIcon = "history";

    useEffect(() => {
        setIsUsersLoading(true);
    }, [props.isDepartmentActivityLoading])

    useEffect(() => {
        if (props.departmentActivity && props.departmentActivity.data.length > 0) {
            getUsers([...new Set(props.departmentActivity.data.map(refrigerantMovement => refrigerantMovement.data.created_by_id))]);
        } else {
            setIsUsersLoading(false);
        }
    }, [props.departmentActivity])

    const getUsers = (userIDs: Array<number | null>) => {
        getAPI('users', {
            ids: userIDs
        }, (response: any) => {
            const userData: UserCollectionResponse = response.data;
            setUserData(userData.data)
        }, setIsUsersLoading)
    }

    const isLoading = (
        props.isDepartmentActivityLoading ||
        isUsersLoading
    )

    return (
        <div>
            <SearchTable 
                headers={['Action', 'Performed By', 'Date']} 
                skeletonRow={<BasicActivityRowSkeleton/>} 
                skeletonCount={Math.min(props.perPage, props.totalCount)} 
                count={props.departmentActivity ? props.departmentActivity.data.length : 0} 
                resourceName={resourceName} 
                resourceIconFont={resourceIcon}
                isLoading={!(!isLoading && props.departmentActivity)}
                body={props.departmentActivity && props.departmentActivity.data.map((departmentActivity, index) => 
                    <DepartmentActivityRow
                        departmentActivity={departmentActivity}
                        user={findUser(userData, departmentActivity.data.created_by_id)}
                        key={index}
                    />
                )}
            />
            {(!isLoading && props.departmentActivity) && <PaginationNavigation
                data={props.departmentActivity.data}
                totalCount={props.departmentActivity.total_count}
                perPage={props.departmentActivity.pages.per_page}
                resourceName={resourceName}
                prefix="department_history"
            />}
        </div>
    )
}

export default DepartmentActivityList