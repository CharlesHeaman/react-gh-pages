import { useState, useEffect } from "react";
import PaginationNavigation from "../../../../../components/ui/PaginationNavigation/PaginationNavigation";
import SearchTable from "../../../../../components/ui/SearchTable/SearchTable";
import { EquipmentTypeActivityCollectionResponse } from "../../../../../types/equipmentTypeActivity.types";
import { UserResponseData, UserCollectionResponse } from "../../../../../types/user.types";
import findUser from "../../../../../utils/findUser";
import getAPI from "../../../../../utils/getAPI";
import BasicActivityRowSkeleton from "../../../../Vehicles/VehiclePage/components/components/VehicleAssociatedResources/components/VehicleActivityRowSkeleton";
import EquipmentTypeActivityRow from "./EquipmentTypeActivityRow";



const EquipmentTypeActivityList = (props: {
    isEquipmentTypeActivityLoading: boolean,
    costCentreActivity: EquipmentTypeActivityCollectionResponse | undefined,
    perPage: number,
    totalCount: number
}) => {
    // Data States
    const [isUsersLoading, setIsUsersLoading] = useState(true);
    const [userData, setUserData] = useState<Array<UserResponseData>>([]);

    // Resource Constants
    const resourceName = "equipment type history";
    const resourceIcon = "history";

    useEffect(() => {
        setIsUsersLoading(true);
    }, [props.isEquipmentTypeActivityLoading])

    useEffect(() => {
        if (props.costCentreActivity && props.costCentreActivity.data.length > 0) {
            getUsers([...new Set(props.costCentreActivity.data.map(refrigerantMovement => refrigerantMovement.data.created_by_id))]);
        } else {
            setIsUsersLoading(false);
        }
    }, [props.costCentreActivity])

    const getUsers = (userIDs: Array<number | null>) => {
        getAPI('users', {
            ids: userIDs
        }, (response: any) => {
            const userData: UserCollectionResponse = response.data;
            setUserData(userData.data)
        }, setIsUsersLoading)
    }

    const isLoading = (
        props.isEquipmentTypeActivityLoading ||
        isUsersLoading
    )

    return (
        <div>
            <SearchTable 
                headers={['Action', 'Performed By', 'Date']} 
                skeletonRow={<BasicActivityRowSkeleton/>} 
                skeletonCount={Math.min(props.perPage, props.totalCount)} 
                count={props.costCentreActivity ? props.costCentreActivity.data.length : 0} 
                resourceName={resourceName} 
                resourceIconFont={resourceIcon}
                isLoading={!(!isLoading && props.costCentreActivity)}
                body={props.costCentreActivity && props.costCentreActivity.data.map((costCentreActivity, index) => 
                    <EquipmentTypeActivityRow
                        equipmentTypeActivity={costCentreActivity}
                        user={findUser(userData, costCentreActivity.data.created_by_id)}
                        key={index}
                    />
                )}
            />
            {(!isLoading && props.costCentreActivity) && <PaginationNavigation
                data={props.costCentreActivity.data}
                totalCount={props.costCentreActivity.total_count}
                perPage={props.costCentreActivity.pages.per_page}
                resourceName={resourceName}
                prefix="equipment_type_history"
            />}
        </div>
    )
}

export default EquipmentTypeActivityList