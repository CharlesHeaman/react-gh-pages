import { useEffect, useState } from "react";
import PaginationNavigation from "../../../../../../../components/ui/PaginationNavigation/PaginationNavigation";
import SearchTable from "../../../../../../../components/ui/SearchTable/SearchTable";
import { UserCollectionResponse, UserResponseData } from "../../../../../../../types/user.types";
import { VehicleActivityCollectionResponse } from "../../../../../../../types/vehicleActivity.types";
import findUser from "../../../../../../../utils/findUser";
import getAPI from "../../../../../../../utils/getAPI";
import VehicleActivityRow from "./VehicleActivityRow";
import BasicActivityRowSkeleton from "./VehicleActivityRowSkeleton";

const VehicleActivityList = (props: {
    isVehicleActivityLoading: boolean,
    vehicleActivity: VehicleActivityCollectionResponse | undefined,
    perPage: number,
    totalCount: number
}) => {
    // Data States
    const [isUsersLoading, setIsUsersLoading] = useState(true);
    const [userData, setUserData] = useState<Array<UserResponseData>>([]);

    // Resource Constants
    const resourceName = "vehicle history";
    const resourceIcon = "history";

    useEffect(() => {
        setIsUsersLoading(true);
    }, [props.isVehicleActivityLoading])

    useEffect(() => {
        if (props.vehicleActivity && props.vehicleActivity.data.length > 0) {
            getUsers([...new Set(props.vehicleActivity.data.map(refrigerantMovement => refrigerantMovement.data.created_by_id))]);
        } else {
            setIsUsersLoading(false);
        }
    }, [props.vehicleActivity])

    const getUsers = (userIDs: Array<number | null>) => {
        getAPI('users', {
            ids: userIDs
        }, (response: any) => {
            const userData: UserCollectionResponse = response.data;
            setUserData(userData.data)
        }, setIsUsersLoading)
    }

    const isLoading = (
        props.isVehicleActivityLoading ||
        isUsersLoading
    )

    return (
        <div>
            <SearchTable 
                headers={['Action', 'Performed By', 'Date']} 
                skeletonRow={<BasicActivityRowSkeleton/>} 
                skeletonCount={Math.min(props.perPage, props.totalCount)} 
                count={props.vehicleActivity ? props.vehicleActivity.data.length : 0} 
                resourceName={resourceName} 
                resourceIconFont={resourceIcon}
                isLoading={!(!isLoading && props.vehicleActivity)}
                body={props.vehicleActivity && props.vehicleActivity.data.map((vehicleActivity, index) => 
                    <VehicleActivityRow
                        vehicleActivity={vehicleActivity}
                        user={findUser(userData, vehicleActivity.data.created_by_id)}
                        key={index}
                    />
                )}
            />
            {(!isLoading && props.vehicleActivity) && <PaginationNavigation
                data={props.vehicleActivity.data}
                totalCount={props.vehicleActivity.total_count}
                perPage={props.vehicleActivity.pages.per_page}
                resourceName={resourceName}
                prefix="vehicle_history"
            />}
        </div>
    )
}

export default VehicleActivityList