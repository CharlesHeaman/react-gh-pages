import { useState, useEffect } from "react";
import PaginationNavigation from "../../../components/ui/PaginationNavigation/PaginationNavigation";
import SearchTable from "../../../components/ui/SearchTable/SearchTable";
import { EngineerEquipmentDetailsActivityCollectionResponse } from "../../../types/engineerEquipmentDetailsActivity.types";
import { UserResponseData, UserCollectionResponse } from "../../../types/user.types";
import findUser from "../../../utils/findUser";
import getAPI from "../../../utils/getAPI";
import BasicActivityRowSkeleton from "../../Vehicles/VehiclePage/components/components/VehicleAssociatedResources/components/VehicleActivityRowSkeleton";
import EngineerEquipmentDetailsActivityRow from "./EngineerEquipmentDetailsActivityRow";

const EngineerEquipmentDetailsActivityList = (props: {
    isEngineerEquipmentDetailsActivityLoading: boolean,
    engineerEquipmentDetailsActivity: EngineerEquipmentDetailsActivityCollectionResponse | undefined,
    perPage: number,
    totalCount: number
}) => {
    // Data States
    const [isUsersLoading, setIsUsersLoading] = useState(true);
    const [userData, setUserData] = useState<Array<UserResponseData>>([]);

    // Resource Constants
    const resourceName = "engineer equipment details history";
    const resourceIcon = "history";

    useEffect(() => {
        setIsUsersLoading(true);
    }, [props.isEngineerEquipmentDetailsActivityLoading])

    useEffect(() => {
        if (props.engineerEquipmentDetailsActivity && props.engineerEquipmentDetailsActivity.data.length > 0) {
            getUsers([...new Set(props.engineerEquipmentDetailsActivity.data.map(refrigerantMovement => refrigerantMovement.data.created_by_id))]);
        } else {
            setIsUsersLoading(false);
        }
    }, [props.engineerEquipmentDetailsActivity])

    const getUsers = (userIDs: Array<number | null>) => {
        getAPI('users', {
            ids: userIDs
        }, (response: any) => {
            const userData: UserCollectionResponse = response.data;
            setUserData(userData.data)
        }, setIsUsersLoading)
    }

    const isLoading = (
        props.isEngineerEquipmentDetailsActivityLoading ||
        isUsersLoading
    )

    return (
        <div>
            <SearchTable 
                headers={['Action', 'Performed By', 'Date']} 
                skeletonRow={<BasicActivityRowSkeleton/>} 
                skeletonCount={Math.min(props.perPage, props.totalCount)} 
                count={props.engineerEquipmentDetailsActivity ? props.engineerEquipmentDetailsActivity.data.length : 0} 
                resourceName={resourceName} 
                resourceIconFont={resourceIcon}
                isLoading={!(!isLoading && props.engineerEquipmentDetailsActivity)}
                body={props.engineerEquipmentDetailsActivity && props.engineerEquipmentDetailsActivity.data.map((engineerEquipmentDetailsActivity, index) => 
                    <EngineerEquipmentDetailsActivityRow
                        engineerEquipmentDetailsActivity={engineerEquipmentDetailsActivity}
                        user={findUser(userData, engineerEquipmentDetailsActivity.data.created_by_id)}
                        key={index}
                    />
                )}
            />
            {(!isLoading && props.engineerEquipmentDetailsActivity) && <PaginationNavigation
                data={props.engineerEquipmentDetailsActivity.data}
                totalCount={props.engineerEquipmentDetailsActivity.total_count}
                perPage={props.engineerEquipmentDetailsActivity.pages.per_page}
                resourceName={resourceName}
                prefix="engineer_equipment_details_history"
            />}
        </div>
    )
}

export default EngineerEquipmentDetailsActivityList