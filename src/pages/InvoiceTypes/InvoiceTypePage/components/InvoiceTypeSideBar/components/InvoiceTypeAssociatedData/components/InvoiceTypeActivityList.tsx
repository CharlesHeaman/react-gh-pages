import { useState, useEffect } from "react";
import BasicActivityRowSkeleton from "../../../../../../../Vehicles/VehiclePage/components/components/VehicleAssociatedResources/components/VehicleActivityRowSkeleton";
import PaginationNavigation from "../../../../../../../../components/ui/PaginationNavigation/PaginationNavigation";
import SearchTable from "../../../../../../../../components/ui/SearchTable/SearchTable";
import { InvoiceTypeActivityCollectionResponse } from "../../../../../../../../types/invoiceTypeActivity.types";
import { UserResponseData, UserCollectionResponse } from "../../../../../../../../types/user.types";
import findUser from "../../../../../../../../utils/findUser";
import getAPI from "../../../../../../../../utils/getAPI";
import InvoiceTypeActivityRow from "./InvoiceTypeActivityRow";

const InvoiceTypeActivityList = (props: {
    isInvoiceTypeActivityLoading: boolean,
    costCentreActivity: InvoiceTypeActivityCollectionResponse | undefined,
    perPage: number,
    totalCount: number
}) => {
    // Data States
    const [isUsersLoading, setIsUsersLoading] = useState(true);
    const [userData, setUserData] = useState<Array<UserResponseData>>([]);

    // Resource Constants
    const resourceName = "invoice type history";
    const resourceIcon = "history";

    useEffect(() => {
        setIsUsersLoading(true);
    }, [props.isInvoiceTypeActivityLoading])

    useEffect(() => {
        if (props.costCentreActivity && props.costCentreActivity.data.length > 0) {
            getUsers([...new Set(props.costCentreActivity.data.map(refrigerantMovement => refrigerantMovement.data.created_by_id))]);
        } else {
            setIsUsersLoading(false);
        }
    }, [props.costCentreActivity])

    const getUsers = (userIDs: Array<number | null>) => {
        getAPI('users', {
            ids: userIDs
        }, (response: any) => {
            const userData: UserCollectionResponse = response.data;
            setUserData(userData.data)
        }, setIsUsersLoading)
    }

    const isLoading = (
        props.isInvoiceTypeActivityLoading ||
        isUsersLoading
    )

    return (
        <div>
            <SearchTable 
                headers={['Action', 'Performed By', 'Date']} 
                skeletonRow={<BasicActivityRowSkeleton/>} 
                skeletonCount={Math.min(props.perPage, props.totalCount)} 
                count={props.costCentreActivity ? props.costCentreActivity.data.length : 0} 
                resourceName={resourceName} 
                resourceIconFont={resourceIcon}
                isLoading={!(!isLoading && props.costCentreActivity)}
                body={props.costCentreActivity && props.costCentreActivity.data.map((costCentreActivity, index) => 
                    <InvoiceTypeActivityRow
                        invoiceTypeActivity={costCentreActivity}
                        user={findUser(userData, costCentreActivity.data.created_by_id)}
                        key={index}
                    />
                )}
            />
            {(!isLoading && props.costCentreActivity) && <PaginationNavigation
                data={props.costCentreActivity.data}
                totalCount={props.costCentreActivity.total_count}
                perPage={props.costCentreActivity.pages.per_page}
                resourceName={resourceName}
                prefix="invoice_type_history"
            />}
        </div>
    )
}

export default InvoiceTypeActivityList