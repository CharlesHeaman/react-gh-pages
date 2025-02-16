import { useState, useEffect } from "react";
import PaginationNavigation from "../../../../../components/ui/PaginationNavigation/PaginationNavigation";
import SearchTable from "../../../../../components/ui/SearchTable/SearchTable";
import { PurchaseOrderActivityCollectionResponse } from "../../../../../types/purchaseOrderActivity.types";
import { UserResponseData, UserCollectionResponse } from "../../../../../types/user.types";
import findUser from "../../../../../utils/findUser";
import getAPI from "../../../../../utils/getAPI";
import BasicActivityRowSkeleton from "../../../../Vehicles/VehiclePage/components/components/VehicleAssociatedResources/components/VehicleActivityRowSkeleton";
import PurchaseOrderActivityRow from "./PurchaseOrderActivityRow";


const PurchaseOrderActivityList = (props: {
    isPurchaseOrderActivityLoading: boolean,
    purchaseOrderActivity: PurchaseOrderActivityCollectionResponse | undefined,
    perPage: number,
    totalCount: number
}) => {
    // Data States
    const [isUsersLoading, setIsUsersLoading] = useState(true);
    const [userData, setUserData] = useState<Array<UserResponseData>>([]);

    // Resource Constants
    const resourceName = "purchase order history";
    const resourceIcon = "history";

    useEffect(() => {
        setIsUsersLoading(true);
    }, [props.isPurchaseOrderActivityLoading])

    useEffect(() => {
        if (props.purchaseOrderActivity && props.purchaseOrderActivity.data.length > 0) {
            getUsers([...new Set(props.purchaseOrderActivity.data.map(refrigerantMovement => refrigerantMovement.data.created_by_id))]);
        } else {
            setIsUsersLoading(false);
        }
    }, [props.purchaseOrderActivity])

    const getUsers = (userIDs: Array<number | null>) => {
        getAPI('users', {
            ids: userIDs
        }, (response: any) => {
            const userData: UserCollectionResponse = response.data;
            setUserData(userData.data)
        }, setIsUsersLoading)
    }

    const isLoading = (
        props.isPurchaseOrderActivityLoading ||
        isUsersLoading
    )

    return (
        <div>
            <SearchTable 
                headers={['Action', 'Performed By', 'Date']} 
                skeletonRow={<BasicActivityRowSkeleton/>} 
                skeletonCount={Math.min(props.perPage, props.totalCount)} 
                count={props.purchaseOrderActivity ? props.purchaseOrderActivity.data.length : 0} 
                resourceName={resourceName} 
                resourceIconFont={resourceIcon}
                isLoading={!(!isLoading && props.purchaseOrderActivity)}
                body={props.purchaseOrderActivity && props.purchaseOrderActivity.data.map((purchaseOrderActivity, index) => 
                    <PurchaseOrderActivityRow
                        purchaseOrderActivity={purchaseOrderActivity}
                        user={findUser(userData, purchaseOrderActivity.data.created_by_id)}
                        key={index}
                    />
                )}
            />
            {(!isLoading && props.purchaseOrderActivity) && <PaginationNavigation
                data={props.purchaseOrderActivity.data}
                totalCount={props.purchaseOrderActivity.total_count}
                perPage={props.purchaseOrderActivity.pages.per_page}
                resourceName={resourceName}
                prefix="purchase_order_history"
            />}
        </div>
    )
}

export default PurchaseOrderActivityList