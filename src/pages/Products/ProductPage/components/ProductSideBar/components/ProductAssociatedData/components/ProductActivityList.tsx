import { useEffect, useState } from "react";
import PaginationNavigation from "../../../../../../../../components/ui/PaginationNavigation/PaginationNavigation";
import SearchTable from "../../../../../../../../components/ui/SearchTable/SearchTable";
import { ProductActivityCollectionResponse } from "../../../../../../../../types/productActivity.types";
import { UserResponseData, UserCollectionResponse } from "../../../../../../../../types/user.types";
import findUser from "../../../../../../../../utils/findUser";
import getAPI from "../../../../../../../../utils/getAPI";
import BasicActivityRowSkeleton from "../../../../../../../Vehicles/VehiclePage/components/components/VehicleAssociatedResources/components/VehicleActivityRowSkeleton";
import ProductActivityRow from "./ProductActivityRow";

const ProductActivityList = (props: {
    isProductActivityLoading: boolean,
    productActivity: ProductActivityCollectionResponse | undefined,
    perPage: number,
    totalCount: number
}) => {
    // Data States
    const [isUsersLoading, setIsUsersLoading] = useState(true);
    const [userData, setUserData] = useState<Array<UserResponseData>>([]);

    // Resource Constants
    const resourceName = "product history";
    const resourceIcon = "history";

    useEffect(() => {
        setIsUsersLoading(true);
    }, [props.isProductActivityLoading])

    useEffect(() => {
        if (props.productActivity && props.productActivity.data.length > 0) {
            getUsers([...new Set(props.productActivity.data.map(refrigerantMovement => refrigerantMovement.data.created_by_id))]);
        } else {
            setIsUsersLoading(false);
        }
    }, [props.productActivity])

    const getUsers = (userIDs: Array<number | null>) => {
        getAPI('users', {
            ids: userIDs
        }, (response: any) => {
            const userData: UserCollectionResponse = response.data;
            setUserData(userData.data)
        }, setIsUsersLoading)
    }

    const isLoading = (
        props.isProductActivityLoading ||
        isUsersLoading
    )

    return (
        <div>
            <SearchTable 
                headers={['Action', 'Performed By', 'Date']} 
                skeletonRow={<BasicActivityRowSkeleton/>} 
                skeletonCount={Math.min(props.perPage, props.totalCount)} 
                count={props.productActivity ? props.productActivity.data.length : 0} 
                resourceName={resourceName} 
                resourceIconFont={resourceIcon}
                isLoading={!(!isLoading && props.productActivity)}
                body={props.productActivity && props.productActivity.data.map((productActivity, index) => 
                    <ProductActivityRow
                        productActivity={productActivity}
                        user={findUser(userData, productActivity.data.created_by_id)}
                        key={index}
                    />
                )}
            />
            {(!isLoading && props.productActivity) && <PaginationNavigation
                data={props.productActivity.data}
                totalCount={props.productActivity.total_count}
                perPage={props.productActivity.pages.per_page}
                resourceName={resourceName}
                prefix="product_history"
            />}
        </div>
    )
}

export default ProductActivityList