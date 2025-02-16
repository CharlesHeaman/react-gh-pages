import { useEffect, useState } from "react";
import PaginationNavigation from "../../../../components/ui/PaginationNavigation/PaginationNavigation";
import SearchTable from "../../../../components/ui/SearchTable/SearchTable";
import { SiteActivityCollectionResponse } from "../../../../types/siteActivity.types";
import { UserResponseData, UserCollectionResponse } from "../../../../types/user.types";
import findUser from "../../../../utils/findUser";
import getAPI from "../../../../utils/getAPI";
import BasicActivityRowSkeleton from "../../../Vehicles/VehiclePage/components/components/VehicleAssociatedResources/components/VehicleActivityRowSkeleton";
import SiteActivityRow from "./SiteActivityRow";

const SiteActivityList = (props: {
    isSiteActivityLoading: boolean,
    siteActivity: SiteActivityCollectionResponse | undefined,
    perPage: number,
    totalCount: number
}) => {
    // Data States
    const [isUsersLoading, setIsUsersLoading] = useState(true);
    const [userData, setUserData] = useState<Array<UserResponseData>>([]);

    // Resource Constants
    const resourceName = "site history";
    const resourceIcon = "history";

    useEffect(() => {
        setIsUsersLoading(true);
    }, [props.isSiteActivityLoading])

    useEffect(() => {
        if (props.siteActivity && props.siteActivity.data.length > 0) {
            getUsers([...new Set(props.siteActivity.data.map(refrigerantMovement => refrigerantMovement.data.created_by_id))]);
        } else {
            setIsUsersLoading(false);
        }
    }, [props.siteActivity])

    const getUsers = (userIDs: Array<number | null>) => {
        getAPI('users', {
            ids: userIDs
        }, (response: any) => {
            const userData: UserCollectionResponse = response.data;
            setUserData(userData.data)
        }, setIsUsersLoading)
    }

    const isLoading = (
        props.isSiteActivityLoading ||
        isUsersLoading
    )

    return (
        <div>
            <SearchTable 
                headers={['Action', 'Performed By', 'Date']} 
                skeletonRow={<BasicActivityRowSkeleton/>} 
                skeletonCount={Math.min(props.perPage, props.totalCount)} 
                count={props.siteActivity ? props.siteActivity.data.length : 0} 
                resourceName={resourceName} 
                resourceIconFont={resourceIcon}
                isLoading={!(!isLoading && props.siteActivity)}
                body={props.siteActivity && props.siteActivity.data.map((siteActivity, index) => 
                    <SiteActivityRow
                        siteActivity={siteActivity}
                        user={findUser(userData, siteActivity.data.created_by_id)}
                        key={index}
                    />
                )}
            />
            {(!isLoading && props.siteActivity) && <PaginationNavigation
                data={props.siteActivity.data}
                totalCount={props.siteActivity.total_count}
                perPage={props.siteActivity.pages.per_page}
                resourceName={resourceName}
                prefix="site_history"
            />}
        </div>
    )
}

export default SiteActivityList