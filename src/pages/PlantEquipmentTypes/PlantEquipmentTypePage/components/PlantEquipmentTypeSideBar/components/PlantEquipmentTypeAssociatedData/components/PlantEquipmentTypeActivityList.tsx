import { useState, useEffect } from "react";
import PaginationNavigation from "../../../../../../../../components/ui/PaginationNavigation/PaginationNavigation";
import SearchTable from "../../../../../../../../components/ui/SearchTable/SearchTable";
import { PlantEquipmentTypeActivityCollectionResponse } from "../../../../../../../../types/PlantEquipmentTypeActivity.types";
import { UserResponseData, UserCollectionResponse } from "../../../../../../../../types/user.types";
import findUser from "../../../../../../../../utils/findUser";
import getAPI from "../../../../../../../../utils/getAPI";
import BasicActivityRowSkeleton from "../../../../../../../Vehicles/VehiclePage/components/components/VehicleAssociatedResources/components/VehicleActivityRowSkeleton";
import PlantEquipmentTypeActivityRow from "./PlantEquipmentTypeActivityRow";


const PlantEquipmentTypeActivityList = (props: {
    isPlantEquipmentTypeActivityLoading: boolean,
    plantEquipmentTypeActivity: PlantEquipmentTypeActivityCollectionResponse | undefined,
    perPage: number,
    totalCount: number
}) => {
    // Data States
    const [isUsersLoading, setIsUsersLoading] = useState(true);
    const [userData, setUserData] = useState<Array<UserResponseData>>([]);

    // Resource Constants
    const resourceName = "plant/tools type history";
    const resourceIcon = "history";

    useEffect(() => {
        setIsUsersLoading(true);
    }, [props.isPlantEquipmentTypeActivityLoading])

    useEffect(() => {
        if (props.plantEquipmentTypeActivity && props.plantEquipmentTypeActivity.data.length > 0) {
            getUsers([...new Set(props.plantEquipmentTypeActivity.data.map(refrigerantMovement => refrigerantMovement.data.created_by_id))]);
        } else {
            setIsUsersLoading(false);
        }
    }, [props.plantEquipmentTypeActivity])

    const getUsers = (userIDs: Array<number | null>) => {
        getAPI('users', {
            ids: userIDs
        }, (response: any) => {
            const userData: UserCollectionResponse = response.data;
            setUserData(userData.data)
        }, setIsUsersLoading)
    }

    const isLoading = (
        props.isPlantEquipmentTypeActivityLoading ||
        isUsersLoading
    )

    return (
        <div>
            <SearchTable 
                headers={['Action', 'Performed By', 'Date']} 
                skeletonRow={<BasicActivityRowSkeleton/>} 
                skeletonCount={Math.min(props.perPage, props.totalCount)} 
                count={props.plantEquipmentTypeActivity ? props.plantEquipmentTypeActivity.data.length : 0} 
                resourceName={resourceName} 
                resourceIconFont={resourceIcon}
                isLoading={!(!isLoading && props.plantEquipmentTypeActivity)}
                body={props.plantEquipmentTypeActivity && props.plantEquipmentTypeActivity.data.map((plantEquipmentTypeActivity, index) => 
                    <PlantEquipmentTypeActivityRow
                        plantEquipmentTypeActivity={plantEquipmentTypeActivity}
                        user={findUser(userData, plantEquipmentTypeActivity.data.created_by_id)}
                        key={index}
                    />
                )}
            />
            {(!isLoading && props.plantEquipmentTypeActivity) && <PaginationNavigation
                totalCount={props.plantEquipmentTypeActivity.total_count}
                perPage={props.plantEquipmentTypeActivity.pages.per_page}
                resourceName={resourceName}
                prefix="plant_equipment_type_history"
            />}
        </div>
    )
}

export default PlantEquipmentTypeActivityList