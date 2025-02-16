import { useEffect, useState } from "react";
import PaginationNavigation from "../../../../../../../../../components/ui/PaginationNavigation/PaginationNavigation";
import SearchTable from "../../../../../../../../../components/ui/SearchTable/SearchTable";
import { ContractActivityCollectionResponse } from "../../../../../../../../../types/contractActivity.types";
import { UserResponseData, UserCollectionResponse } from "../../../../../../../../../types/user.types";
import findUser from "../../../../../../../../../utils/findUser";
import getAPI from "../../../../../../../../../utils/getAPI";
import BasicActivityRowSkeleton from "../../../../../../../../Vehicles/VehiclePage/components/components/VehicleAssociatedResources/components/VehicleActivityRowSkeleton";
import ContractActivityRow from "./ContractActivityRow";

const ContractActivityList = (props: {
    isContractActivityLoading: boolean,
    contractActivity: ContractActivityCollectionResponse | undefined,
    perPage: number,
    totalCount: number
}) => {
    // Data States
    const [isUsersLoading, setIsUsersLoading] = useState(true);
    const [userData, setUserData] = useState<Array<UserResponseData>>([]);

    // Resource Constants
    const resourceName = "contract history";
    const resourceIcon = "history";

    useEffect(() => {
        setIsUsersLoading(true);
    }, [props.isContractActivityLoading])

    useEffect(() => {
        if (props.contractActivity && props.contractActivity.data.length > 0) {
            getUsers([...new Set(props.contractActivity.data.map(refrigerantMovement => refrigerantMovement.data.created_by_id))]);
        } else {
            setIsUsersLoading(false);
        }
    }, [props.contractActivity])

    const getUsers = (userIDs: Array<number | null>) => {
        getAPI('users', {
            ids: userIDs
        }, (response: any) => {
            const userData: UserCollectionResponse = response.data;
            setUserData(userData.data)
        }, setIsUsersLoading)
    }

    const isLoading = (
        props.isContractActivityLoading ||
        isUsersLoading
    )

    return (
        <div>
            <SearchTable 
                headers={['Action', 'Performed By', 'Date']} 
                skeletonRow={<BasicActivityRowSkeleton/>} 
                skeletonCount={Math.min(props.perPage, props.totalCount)} 
                count={props.contractActivity ? props.contractActivity.data.length : 0} 
                resourceName={resourceName} 
                resourceIconFont={resourceIcon}
                isLoading={!(!isLoading && props.contractActivity)}
                body={props.contractActivity && props.contractActivity.data.map((contractActivity, index) => 
                    <ContractActivityRow
                        contractActivity={contractActivity}
                        user={findUser(userData, contractActivity.data.created_by_id)}
                        key={index}
                    />
                )}
            />
            {(!isLoading && props.contractActivity) && <PaginationNavigation
                data={props.contractActivity.data}
                totalCount={props.contractActivity.total_count}
                perPage={props.contractActivity.pages.per_page}
                resourceName={resourceName}
                prefix="contract_history"
            />}
        </div>
    )
}

export default ContractActivityList