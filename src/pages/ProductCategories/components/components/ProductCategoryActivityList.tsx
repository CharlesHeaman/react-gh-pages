import { useState, useEffect } from "react";
import PaginationNavigation from "../../../../components/ui/PaginationNavigation/PaginationNavigation";
import SearchTable from "../../../../components/ui/SearchTable/SearchTable";
import { ProductCategoryActivityCollectionResponse } from "../../../../types/productCategoryActivity.types";
import { UserResponseData, UserCollectionResponse } from "../../../../types/user.types";
import findUser from "../../../../utils/findUser";
import getAPI from "../../../../utils/getAPI";
import BasicActivityRowSkeleton from "../../../Vehicles/VehiclePage/components/components/VehicleAssociatedResources/components/VehicleActivityRowSkeleton";
import ProductCategoryActivityRow from "./ProductCategoryActivityRow";

const ProductCategoryActivityList = (props: {
    isProductCategoryActivityLoading: boolean,
    productCategoryActivity: ProductCategoryActivityCollectionResponse | undefined,
    perPage: number,
    totalCount: number
}) => {
    // Data States
    const [isUsersLoading, setIsUsersLoading] = useState(true);
    const [userData, setUserData] = useState<Array<UserResponseData>>([]);

    // Resource Constants
    const resourceName = "product category history";
    const resourceIcon = "history";

    useEffect(() => {
        setIsUsersLoading(true);
    }, [props.isProductCategoryActivityLoading])

    useEffect(() => {
        if (props.productCategoryActivity && props.productCategoryActivity.data.length > 0) {
            getUsers([...new Set(props.productCategoryActivity.data.map(refrigerantMovement => refrigerantMovement.data.created_by_id))]);
        } else {
            setIsUsersLoading(false);
        }
    }, [props.productCategoryActivity])

    const getUsers = (userIDs: Array<number | null>) => {
        getAPI('users', {
            ids: userIDs
        }, (response: any) => {
            const userData: UserCollectionResponse = response.data;
            setUserData(userData.data)
        }, setIsUsersLoading)
    }

    const isLoading = (
        props.isProductCategoryActivityLoading ||
        isUsersLoading
    )

    return (
        <div>
            <SearchTable 
                headers={['Action', 'Performed By', 'Date']} 
                skeletonRow={<BasicActivityRowSkeleton/>} 
                skeletonCount={Math.min(props.perPage, props.totalCount)} 
                count={props.productCategoryActivity ? props.productCategoryActivity.data.length : 0} 
                resourceName={resourceName} 
                resourceIconFont={resourceIcon}
                isLoading={!(!isLoading && props.productCategoryActivity)}
                body={props.productCategoryActivity && props.productCategoryActivity.data.map((productCategoryActivity, index) => 
                    <ProductCategoryActivityRow
                        productCategoryActivity={productCategoryActivity}
                        user={findUser(userData, productCategoryActivity.data.created_by_id)}
                        key={index}
                    />
                )}
            />
            {(!isLoading && props.productCategoryActivity) && <PaginationNavigation
                data={props.productCategoryActivity.data}
                totalCount={props.productCategoryActivity.total_count}
                perPage={props.productCategoryActivity.pages.per_page}
                resourceName={resourceName}
                prefix="product_category_history"
            />}
        </div>
    )
}

export default ProductCategoryActivityList