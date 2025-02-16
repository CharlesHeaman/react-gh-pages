import { useEffect, useState } from "react";
import PaginationNavigation from "../../../components/ui/PaginationNavigation/PaginationNavigation";
import SearchTable from "../../../components/ui/SearchTable/SearchTable";
import { TimegridActivityCollectionResponse } from "../../../types/timegridActivity.types";
import { UserResponseData, UserCollectionResponse } from "../../../types/user.types";
import findUser from "../../../utils/findUser";
import getAPI from "../../../utils/getAPI";
import BasicActivityRowSkeleton from "../../Vehicles/VehiclePage/components/components/VehicleAssociatedResources/components/VehicleActivityRowSkeleton";
import TimegridActivityRow from "./TimegridActivityRow";

const TimegridActivityList = (props: {
    isTimegridActivityLoading: boolean,
    timegridActivity: TimegridActivityCollectionResponse | undefined,
    perPage: number,
    totalCount: number
}) => {
    // Data States
    const [isUsersLoading, setIsUsersLoading] = useState(true);
    const [userData, setUserData] = useState<Array<UserResponseData>>([]);

    // Resource Constants
    const resourceName = "timegrid history";
    const resourceIcon = "history";

    useEffect(() => {
        setIsUsersLoading(true);
    }, [props.isTimegridActivityLoading])

    useEffect(() => {
        if (props.timegridActivity && props.timegridActivity.data.length > 0) {
            getUsers([...new Set(props.timegridActivity.data.map(activity => activity.data.activity_by_id))]);
        } else {
            setIsUsersLoading(false);
        }
    }, [props.timegridActivity])

    const getUsers = (userIDs: Array<number | null>) => {
        getAPI('users', {
            ids: userIDs
        }, (response: any) => {
            const userData: UserCollectionResponse = response.data;
            setUserData(userData.data)
        }, setIsUsersLoading)
    }

    const isLoading = (
        props.isTimegridActivityLoading ||
        isUsersLoading
    )

    return (
        <div>
            <SearchTable 
                headers={['Action', 'Performed By', 'Date']} 
                skeletonRow={<BasicActivityRowSkeleton/>} 
                skeletonCount={Math.min(props.perPage, props.totalCount)} 
                count={props.timegridActivity ? props.timegridActivity.data.length : 0} 
                resourceName={resourceName} 
                resourceIconFont={resourceIcon}
                isLoading={!(!isLoading && props.timegridActivity)}
                body={props.timegridActivity && props.timegridActivity.data.map((timegridActivity, index) => 
                    <TimegridActivityRow
                        timegridActivity={timegridActivity}
                        user={findUser(userData, timegridActivity.data.activity_by_id)}
                        key={index}
                    />
                )}
            />
            {(!isLoading && props.timegridActivity) && <PaginationNavigation
                data={props.timegridActivity.data}
                totalCount={props.timegridActivity.total_count}
                perPage={props.timegridActivity.pages.per_page}
                resourceName={resourceName}
                prefix="timegrid_history"
            />}
        </div>
    )
}

export default TimegridActivityList