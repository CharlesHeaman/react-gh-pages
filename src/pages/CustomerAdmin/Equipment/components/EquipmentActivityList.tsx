import { useEffect, useState } from "react";
import PaginationNavigation from "../../../../components/ui/PaginationNavigation/PaginationNavigation";
import SearchTable from "../../../../components/ui/SearchTable/SearchTable";
import { EquipmentActivityCollectionResponse } from "../../../../types/equipmentActivity.types";
import { UserResponseData, UserCollectionResponse } from "../../../../types/user.types";
import findUser from "../../../../utils/findUser";
import getAPI from "../../../../utils/getAPI";
import BasicActivityRowSkeleton from "../../../Vehicles/VehiclePage/components/components/VehicleAssociatedResources/components/VehicleActivityRowSkeleton";
import EquipmentActivityRow from "./EquipmentActivityRow";

const EquipmentActivityList = (props: {
    isEquipmentActivityLoading: boolean,
    equipmentActivity: EquipmentActivityCollectionResponse | undefined,
    perPage: number,
    totalCount: number
}) => {
    // Data States
    const [isUsersLoading, setIsUsersLoading] = useState(true);
    const [userData, setUserData] = useState<Array<UserResponseData>>([]);

    // Resource Constants
    const resourceName = "equipment history";
    const resourceIcon = "history";

    useEffect(() => {
        setIsUsersLoading(true);
    }, [props.isEquipmentActivityLoading])

    useEffect(() => {
        if (props.equipmentActivity && props.equipmentActivity.data.length > 0) {
            getUsers([...new Set(props.equipmentActivity.data.map(refrigerantMovement => refrigerantMovement.data.created_by_id))]);
        } else {
            setIsUsersLoading(false);
        }
    }, [props.equipmentActivity])

    const getUsers = (userIDs: Array<number | null>) => {
        getAPI('users', {
            ids: userIDs
        }, (response: any) => {
            const userData: UserCollectionResponse = response.data;
            setUserData(userData.data)
        }, setIsUsersLoading)
    }

    const isLoading = (
        props.isEquipmentActivityLoading ||
        isUsersLoading
    )

    return (
        <div>
            <SearchTable 
                headers={['Action', 'Performed By', 'Date']} 
                skeletonRow={<BasicActivityRowSkeleton/>} 
                skeletonCount={Math.min(props.perPage, props.totalCount)} 
                count={props.equipmentActivity ? props.equipmentActivity.data.length : 0} 
                resourceName={resourceName} 
                resourceIconFont={resourceIcon}
                isLoading={!(!isLoading && props.equipmentActivity)}
                body={props.equipmentActivity && props.equipmentActivity.data.map((equipmentActivity, index) => 
                    <EquipmentActivityRow
                        equipmentActivity={equipmentActivity}
                        user={findUser(userData, equipmentActivity.data.created_by_id)}
                        key={index}
                    />
                )}
            />
            {(!isLoading && props.equipmentActivity) && <PaginationNavigation
                data={props.equipmentActivity.data}
                totalCount={props.equipmentActivity.total_count}
                perPage={props.equipmentActivity.pages.per_page}
                resourceName={resourceName}
                prefix="equipment_history"
            />}
        </div>
    )
}

export default EquipmentActivityList