import { useEffect, useState } from "react";
import PaginationNavigation from "../../../../../../../../components/ui/PaginationNavigation/PaginationNavigation";
import SearchTable from "../../../../../../../../components/ui/SearchTable/SearchTable";
import { SupplierManufacturerContactActivityCollectionResponse } from "../../../../../../../../types/supplierManufacturerContactActivity.types";
import { UserResponseData, UserCollectionResponse } from "../../../../../../../../types/user.types";
import findUser from "../../../../../../../../utils/findUser";
import getAPI from "../../../../../../../../utils/getAPI";
import BasicActivityRowSkeleton from "../../../../../../../Vehicles/VehiclePage/components/components/VehicleAssociatedResources/components/VehicleActivityRowSkeleton";
import SupplierManufacturerContactActivityRow from "./SupplierManufacturerContactActivityRow";


const SupplierManufacturerContactActivityList = (props: {
    isSupplierManufacturerContactActivityLoading: boolean,
    supplierManufacturerContactActivity: SupplierManufacturerContactActivityCollectionResponse | undefined,
    perPage: number,
    totalCount: number
}) => {
    // Data States
    const [isUsersLoading, setIsUsersLoading] = useState(true);
    const [userData, setUserData] = useState<Array<UserResponseData>>([]);

    // Resource Constants
    const resourceName = "supplier manufacturer contact history";
    const resourceIcon = "history";

    useEffect(() => {
        setIsUsersLoading(true);
    }, [props.isSupplierManufacturerContactActivityLoading])

    useEffect(() => {
        if (props.supplierManufacturerContactActivity && props.supplierManufacturerContactActivity.data.length > 0) {
            getUsers([...new Set(props.supplierManufacturerContactActivity.data.map(refrigerantMovement => refrigerantMovement.data.created_by_id))]);
        } else {
            setIsUsersLoading(false);
        }
    }, [props.supplierManufacturerContactActivity])

    const getUsers = (userIDs: Array<number | null>) => {
        getAPI('users', {
            ids: userIDs
        }, (response: any) => {
            const userData: UserCollectionResponse = response.data;
            setUserData(userData.data)
        }, setIsUsersLoading)
    }

    const isLoading = (
        props.isSupplierManufacturerContactActivityLoading ||
        isUsersLoading
    )

    return (
        <div>
            <SearchTable 
                headers={['Action', 'Performed By', 'Date']} 
                skeletonRow={<BasicActivityRowSkeleton/>} 
                skeletonCount={Math.min(props.perPage, props.totalCount)} 
                count={props.supplierManufacturerContactActivity ? props.supplierManufacturerContactActivity.data.length : 0} 
                resourceName={resourceName} 
                resourceIconFont={resourceIcon}
                isLoading={!(!isLoading && props.supplierManufacturerContactActivity)}
                body={props.supplierManufacturerContactActivity && props.supplierManufacturerContactActivity.data.map((supplierManufacturerContactActivity, index) => 
                    <SupplierManufacturerContactActivityRow
                        supplierManufacturerContactActivity={supplierManufacturerContactActivity}
                        user={findUser(userData, supplierManufacturerContactActivity.data.created_by_id)}
                        key={index}
                    />
                )}
            />
            {(!isLoading && props.supplierManufacturerContactActivity) && <PaginationNavigation
                data={props.supplierManufacturerContactActivity.data}
                totalCount={props.supplierManufacturerContactActivity.total_count}
                perPage={props.supplierManufacturerContactActivity.pages.per_page}
                resourceName={resourceName}
                prefix="supplier_manufacturer_contact_history"
            />}
        </div>
    )
}

export default SupplierManufacturerContactActivityList