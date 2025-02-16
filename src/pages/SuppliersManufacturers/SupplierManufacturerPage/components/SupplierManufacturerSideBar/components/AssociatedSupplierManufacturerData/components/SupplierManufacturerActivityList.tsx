import { useEffect, useState } from "react";
import PaginationNavigation from "../../../../../../../../components/ui/PaginationNavigation/PaginationNavigation";
import SearchTable from "../../../../../../../../components/ui/SearchTable/SearchTable";
import { SupplierManufacturerActivityCollectionResponse } from "../../../../../../../../types/supplierManufacturerActivity.types";
import { UserResponseData, UserCollectionResponse } from "../../../../../../../../types/user.types";
import findUser from "../../../../../../../../utils/findUser";
import getAPI from "../../../../../../../../utils/getAPI";
import BasicActivityRowSkeleton from "../../../../../../../Vehicles/VehiclePage/components/components/VehicleAssociatedResources/components/VehicleActivityRowSkeleton";
import SupplierManufacturerActivityRow from "./SupplierManufacturerActivityRow";

const SupplierManufacturerActivityList = (props: {
    isSupplierManufacturerActivityLoading: boolean,
    supplierManufacturerActivity: SupplierManufacturerActivityCollectionResponse | undefined,
    perPage: number,
    totalCount: number
}) => {
    // Data States
    const [isUsersLoading, setIsUsersLoading] = useState(true);
    const [userData, setUserData] = useState<Array<UserResponseData>>([]);

    // Resource Constants
    const resourceName = "supplier manufacturer history";
    const resourceIcon = "history";

    useEffect(() => {
        setIsUsersLoading(true);
    }, [props.isSupplierManufacturerActivityLoading])

    useEffect(() => {
        if (props.supplierManufacturerActivity && props.supplierManufacturerActivity.data.length > 0) {
            getUsers([...new Set(props.supplierManufacturerActivity.data.map(refrigerantMovement => refrigerantMovement.data.created_by_id))]);
        } else {
            setIsUsersLoading(false);
        }
    }, [props.supplierManufacturerActivity])

    const getUsers = (userIDs: Array<number | null>) => {
        getAPI('users', {
            ids: userIDs
        }, (response: any) => {
            const userData: UserCollectionResponse = response.data;
            setUserData(userData.data)
        }, setIsUsersLoading)
    }

    const isLoading = (
        props.isSupplierManufacturerActivityLoading ||
        isUsersLoading
    )

    return (
        <div>
            <SearchTable 
                headers={['Action', 'Performed By', 'Date']} 
                skeletonRow={<BasicActivityRowSkeleton/>} 
                skeletonCount={Math.min(props.perPage, props.totalCount)} 
                count={props.supplierManufacturerActivity ? props.supplierManufacturerActivity.data.length : 0} 
                resourceName={resourceName} 
                resourceIconFont={resourceIcon}
                isLoading={!(!isLoading && props.supplierManufacturerActivity)}
                body={props.supplierManufacturerActivity && props.supplierManufacturerActivity.data.map((supplierManufacturerActivity, index) => 
                    <SupplierManufacturerActivityRow
                        supplierManufacturerActivity={supplierManufacturerActivity}
                        user={findUser(userData, supplierManufacturerActivity.data.created_by_id)}
                        key={index}
                    />
                )}
            />
            {(!isLoading && props.supplierManufacturerActivity) && <PaginationNavigation
                data={props.supplierManufacturerActivity.data}
                totalCount={props.supplierManufacturerActivity.total_count}
                perPage={props.supplierManufacturerActivity.pages.per_page}
                resourceName={resourceName}
                prefix="supplier_manufacturer_history"
            />}
        </div>
    )
}

export default SupplierManufacturerActivityList