import { useEffect, useState } from "react";
import PaginationNavigation from "../../../../../../../../components/ui/PaginationNavigation/PaginationNavigation";
import SearchTable from "../../../../../../../../components/ui/SearchTable/SearchTable";
import { PlantEquipmentActivityCollectionResponse } from "../../../../../../../../types/plantEquipmentActivity.types";
import { UserResponseData, UserCollectionResponse } from "../../../../../../../../types/user.types";
import findUser from "../../../../../../../../utils/findUser";
import getAPI from "../../../../../../../../utils/getAPI";
import BasicActivityRowSkeleton from "../../../../../../../Vehicles/VehiclePage/components/components/VehicleAssociatedResources/components/VehicleActivityRowSkeleton";
import PlantEquipmentActivityRow from "./PlantEquipmentActivityRow";

const PlantEquipmentActivityList = (props: {
    isPlantEquipmentActivityLoading: boolean,
    plantEquipmentActivity: PlantEquipmentActivityCollectionResponse | undefined,
    perPage: number,
    totalCount: number
}) => {
    // Data States
    const [isUsersLoading, setIsUsersLoading] = useState(true);
    const [userData, setUserData] = useState<Array<UserResponseData>>([]);

    // Resource Constants
    const resourceName = "plant equipment history";
    const resourceIcon = "history";

    useEffect(() => {
        setIsUsersLoading(true);
    }, [props.isPlantEquipmentActivityLoading])

    useEffect(() => {
        if (props.plantEquipmentActivity && props.plantEquipmentActivity.data.length > 0) {
            getUsers([...new Set(props.plantEquipmentActivity.data.map(refrigerantMovement => refrigerantMovement.data.created_by_id))]);
        } else {
            setIsUsersLoading(false);
        }
    }, [props.plantEquipmentActivity])

    const getUsers = (userIDs: Array<number | null>) => {
        getAPI('users', {
            ids: userIDs
        }, (response: any) => {
            const userData: UserCollectionResponse = response.data;
            setUserData(userData.data)
        }, setIsUsersLoading)
    }

    const isLoading = (
        props.isPlantEquipmentActivityLoading ||
        isUsersLoading
    )

    return (
        <div>
            <SearchTable 
                headers={['Action', 'Performed By', 'Date']} 
                skeletonRow={<BasicActivityRowSkeleton/>} 
                skeletonCount={Math.min(props.perPage, props.totalCount)} 
                count={props.plantEquipmentActivity ? props.plantEquipmentActivity.data.length : 0} 
                resourceName={resourceName} 
                resourceIconFont={resourceIcon}
                isLoading={!(!isLoading && props.plantEquipmentActivity)}
                body={props.plantEquipmentActivity && props.plantEquipmentActivity.data.map((plantEquipmentActivity, index) => 
                    <PlantEquipmentActivityRow
                        plantEquipmentActivity={plantEquipmentActivity}
                        user={findUser(userData, plantEquipmentActivity.data.created_by_id)}
                        key={index}
                    />
                )}
            />
            {(!isLoading && props.plantEquipmentActivity) && <PaginationNavigation
                data={props.plantEquipmentActivity.data}
                totalCount={props.plantEquipmentActivity.total_count}
                perPage={props.plantEquipmentActivity.pages.per_page}
                resourceName={resourceName}
                prefix="plant_equipment_history"
            />}
        </div>
    )
}

export default PlantEquipmentActivityList