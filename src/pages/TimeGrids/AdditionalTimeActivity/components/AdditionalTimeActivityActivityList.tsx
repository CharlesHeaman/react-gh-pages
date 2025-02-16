import { useState, useEffect } from "react";
import PaginationNavigation from "../../../../components/ui/PaginationNavigation/PaginationNavigation";
import SearchTable from "../../../../components/ui/SearchTable/SearchTable";
import { AdditionalTimeActivityActivityCollectionResponse } from "../../../../types/additionalTimeActivityActivity.types";
import { UserResponseData, UserCollectionResponse } from "../../../../types/user.types";
import findUser from "../../../../utils/findUser";
import getAPI from "../../../../utils/getAPI";
import BasicActivityRowSkeleton from "../../../Vehicles/VehiclePage/components/components/VehicleAssociatedResources/components/VehicleActivityRowSkeleton";
import AdditionalTimeActivityActivityRow from "./AdditionalTimeActivityActivityRow";


const AdditionalTimeActivityActivityList = (props: {
    isAdditionalTimeActivityActivityLoading: boolean,
    additionalTimeActivityActivity: AdditionalTimeActivityActivityCollectionResponse | undefined,
    perPage: number,
    totalCount: number
}) => {
    // Data States
    const [isUsersLoading, setIsUsersLoading] = useState(true);
    const [userData, setUserData] = useState<Array<UserResponseData>>([]);

    // Resource Constants
    const resourceName = "additional time activity history";
    const resourceIcon = "history";

    useEffect(() => {
        setIsUsersLoading(true);
    }, [props.isAdditionalTimeActivityActivityLoading])

    useEffect(() => {
        if (props.additionalTimeActivityActivity && props.additionalTimeActivityActivity.data.length > 0) {
            getUsers([...new Set(props.additionalTimeActivityActivity.data.map(refrigerantMovement => refrigerantMovement.data.created_by_id))]);
        } else {
            setIsUsersLoading(false);
        }
    }, [props.additionalTimeActivityActivity])

    const getUsers = (userIDs: Array<number | null>) => {
        getAPI('users', {
            ids: userIDs
        }, (response: any) => {
            const userData: UserCollectionResponse = response.data;
            setUserData(userData.data)
        }, setIsUsersLoading)
    }

    const isLoading = (
        props.isAdditionalTimeActivityActivityLoading ||
        isUsersLoading
    )

    return (
        <div>
            <SearchTable 
                headers={['Action', 'Performed By', 'Date']} 
                skeletonRow={<BasicActivityRowSkeleton/>} 
                skeletonCount={Math.min(props.perPage, props.totalCount)} 
                count={props.additionalTimeActivityActivity ? props.additionalTimeActivityActivity.data.length : 0} 
                resourceName={resourceName} 
                resourceIconFont={resourceIcon}
                isLoading={!(!isLoading && props.additionalTimeActivityActivity)}
                body={props.additionalTimeActivityActivity && props.additionalTimeActivityActivity.data.map((additionalTimeActivityActivity, index) => 
                    <AdditionalTimeActivityActivityRow
                        additionalTimeActivityActivity={additionalTimeActivityActivity}
                        user={findUser(userData, additionalTimeActivityActivity.data.created_by_id)}
                        key={index}
                    />
                )}
            />
            {(!isLoading && props.additionalTimeActivityActivity) && <PaginationNavigation
                data={props.additionalTimeActivityActivity.data}
                totalCount={props.additionalTimeActivityActivity.total_count}
                perPage={props.additionalTimeActivityActivity.pages.per_page}
                resourceName={resourceName}
                prefix="additional_time_activity_history"
            />}
        </div>
    )
}

export default AdditionalTimeActivityActivityList