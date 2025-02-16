import { useState, useEffect } from "react";
import PaginationNavigation from "../../../../components/ui/PaginationNavigation/PaginationNavigation";
import SearchTable from "../../../../components/ui/SearchTable/SearchTable";
import { AdditionalTimeCollectionResponse } from "../../../../types/additionalTime.types";
import { UserResponseData, UserCollectionResponse } from "../../../../types/user.types";
import findUser from "../../../../utils/findUser";
import getAPI from "../../../../utils/getAPI";
import AdditionalTimeRow from "./AdditionalTimeRow";
import AdditionalTimeRowSkeleton from "./AdditionalTimeRowSkeleton";


const AdditionalTimeList = (props: {
    isAdditionalTimeLoading: boolean,
    additionalTime: AdditionalTimeCollectionResponse | undefined,
    perPage: number,
    totalCount: number
}) => {
    // Data States
    const [isUsersLoading, setIsUsersLoading] = useState(true);
    const [userData, setUserData] = useState<Array<UserResponseData>>([]);

    // Resource Constants
    const resourceName = "additional time";
    const resourceIcon = "more_time";

    useEffect(() => {
        setIsUsersLoading(true);
    }, [props.isAdditionalTimeLoading])

    useEffect(() => {
        if (props.additionalTime && props.additionalTime.data.length > 0) {
            getUsers([...new Set(props.additionalTime.data.map(additionalTime => additionalTime.data.user_id))]);
        } else {
            setIsUsersLoading(false);
        }
    }, [props.additionalTime])

    const getUsers = (userIDs: Array<number | null>) => {
        getAPI('users', {
            ids: userIDs
        }, (response: any) => {
            const userData: UserCollectionResponse = response.data;
            setUserData(userData.data)
        }, setIsUsersLoading)
    }

    const isLoading = (
        props.isAdditionalTimeLoading ||
        isUsersLoading
    )

    return (
        <div>
            <SearchTable 
                headers={['User', 'Duration', 'Travel Time', 'Mileage', 'Expenses', 'Date']} 
                skeletonRow={<AdditionalTimeRowSkeleton/>} 
                skeletonCount={Math.min(props.perPage, props.totalCount)} 
                count={props.additionalTime ? props.additionalTime.data.length : 0} 
                resourceName={resourceName} 
                resourceIconFont={resourceIcon}
                isLoading={!(!isLoading && props.additionalTime)}
                body={props.additionalTime && props.additionalTime.data.map((additionalTime, index) => 
                    <AdditionalTimeRow
                        additionalTime={additionalTime}
                        user={findUser(userData, additionalTime.data.user_id)}
                        key={index}
                    />
                )}
            />
            {(!isLoading && props.additionalTime) && <PaginationNavigation
                data={props.additionalTime.data}
                totalCount={props.additionalTime.total_count}
                perPage={props.additionalTime.pages.per_page}
                resourceName={resourceName}
                prefix="additional_time"
            />}
        </div>
    )
}

export default AdditionalTimeList