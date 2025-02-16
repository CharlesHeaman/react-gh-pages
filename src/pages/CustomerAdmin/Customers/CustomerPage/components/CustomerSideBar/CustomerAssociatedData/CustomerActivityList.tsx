import { useEffect, useState } from "react";
import PaginationNavigation from "../../../../../../../components/ui/PaginationNavigation/PaginationNavigation";
import SearchTable from "../../../../../../../components/ui/SearchTable/SearchTable";
import { CustomerActivityCollectionResponse } from "../../../../../../../types/customerActivity.types";
import { UserResponseData, UserCollectionResponse } from "../../../../../../../types/user.types";
import findUser from "../../../../../../../utils/findUser";
import getAPI from "../../../../../../../utils/getAPI";
import BasicActivityRowSkeleton from "../../../../../../Vehicles/VehiclePage/components/components/VehicleAssociatedResources/components/VehicleActivityRowSkeleton";
import CustomerActivityRow from "./CustomerActivityRow";

const CustomerActivityList = (props: {
    isCustomerActivityLoading: boolean,
    customerActivity: CustomerActivityCollectionResponse | undefined,
    perPage: number,
    totalCount: number
}) => {
    // Data States
    const [isUsersLoading, setIsUsersLoading] = useState(true);
    const [userData, setUserData] = useState<Array<UserResponseData>>([]);

    // Resource Constants
    const resourceName = "customer history";
    const resourceIcon = "history";

    useEffect(() => {
        setIsUsersLoading(true);
    }, [props.isCustomerActivityLoading])

    useEffect(() => {
        if (props.customerActivity && props.customerActivity.data.length > 0) {
            getUsers([...new Set(props.customerActivity.data.map(refrigerantMovement => refrigerantMovement.data.created_by_id))]);
        } else {
            setIsUsersLoading(false);
        }
    }, [props.customerActivity])

    const getUsers = (userIDs: Array<number | null>) => {
        getAPI('users', {
            ids: userIDs
        }, (response: any) => {
            const userData: UserCollectionResponse = response.data;
            setUserData(userData.data)
        }, setIsUsersLoading)
    }

    const isLoading = (
        props.isCustomerActivityLoading ||
        isUsersLoading
    )

    return (
        <div>
            <SearchTable 
                headers={['Action', 'Performed By', 'Date']} 
                skeletonRow={<BasicActivityRowSkeleton/>} 
                skeletonCount={Math.min(props.perPage, props.totalCount)} 
                count={props.customerActivity ? props.customerActivity.data.length : 0} 
                resourceName={resourceName} 
                resourceIconFont={resourceIcon}
                isLoading={!(!isLoading && props.customerActivity)}
                body={props.customerActivity && props.customerActivity.data.map((customerActivity, index) => 
                    <CustomerActivityRow
                        customerActivity={customerActivity}
                        user={findUser(userData, customerActivity.data.created_by_id)}
                        key={index}
                    />
                )}
            />
            {(!isLoading && props.customerActivity) && <PaginationNavigation
                data={props.customerActivity.data}
                totalCount={props.customerActivity.total_count}
                perPage={props.customerActivity.pages.per_page}
                resourceName={resourceName}
                prefix="customer_history"
            />}
        </div>
    )
}

export default CustomerActivityList