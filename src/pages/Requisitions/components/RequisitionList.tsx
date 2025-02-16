import { useEffect, useState } from "react"
import PaginationNavigation from "../../../components/ui/PaginationNavigation/PaginationNavigation"
import SearchTable from "../../../components/ui/SearchTable/SearchTable"
import { RequisitionCollectionResponse } from "../../../types/requisition.types"
import { UserCollectionResponse, UserResponseData } from "../../../types/user.types"
import findUser from "../../../utils/findUser"
import getAPI from "../../../utils/getAPI"
import RequisitionRow from "./RequisitionRow"
import RequisitionLineSkeleton from "./RequisitionLineSkeleton"
import { CostCentreCollectionResponse, CostCentreResponseData } from "../../../types/costCentres.types"
import findCostCentre from "../../../utils/findCostCentre"
import SearchHelperText from "../../../components/ui/SearchHelperText/SearchHelperText"

const RequisitionList = (props: {
    hasSearched: boolean,
    isRequisitionLoading: boolean,
    requisitions: RequisitionCollectionResponse | undefined,
    perPage: number,
    totalCount?: number,
    showAdvancedSearch?: () => void,
    hideType?: boolean,
}) => {
    // Data States
    const [isUsersLoading, setIsUsersLoading] = useState(false);
    const [userData, setUserData] = useState<Array<UserResponseData>>([]);
    const [isCostCentresLoading, setIsCostCentresLoading] = useState(false);
    const [costCentreData, setCostCentreData] = useState<Array<CostCentreResponseData>>([]);

    // Resource Constants
    const resourceName = "requisitions";
    const resourceIcon = "all_inbox";

    useEffect(() => {
        setIsUsersLoading(true);
        !props.hideType && setIsCostCentresLoading(true);
    }, [props.isRequisitionLoading])

    useEffect(() => {
        if (props.requisitions && props.requisitions.data.length > 0) {
            getUsers([...new Set(props.requisitions.data.map(requisition => [requisition.data.created_by_id, requisition.data.recipient_id]).flat(1))]);
            !props.hideType && getCostCentres([...new Set(props.requisitions.data.map(requisition => requisition.data.cost_centre_id))]);
        } else {
            setIsUsersLoading(false);
            !props.hideType && setIsCostCentresLoading(false);
        }
    }, [props.requisitions])

    const getUsers = (userIDs: Array<number>) => {
        getAPI('users', {
            ids: userIDs,
        }, (response: any) => {
            const userData: UserCollectionResponse = response.data;
            setUserData(userData.data)
        }, setIsUsersLoading)
    }

    const getCostCentres = (costCentreIDs: Array<number>) => {
        getAPI('cost_centres', {
            ids: costCentreIDs,
        }, (response: any) => {
            const costCentreData: CostCentreCollectionResponse = response.data;
            setCostCentreData(costCentreData.data)
        }, setIsCostCentresLoading)
    }

    const isLoading = (
        props.isRequisitionLoading || 
        isUsersLoading || 
        isCostCentresLoading
    )

    const getTableHeader = () => {
        var tableHeader = ['Number', 'Type', 'Originator', 'Recipient', 'Date', 'Status'];
        if (props.hideType) {
            var headerIndex = tableHeader.indexOf('Type');
            if (headerIndex !== -1) {
                tableHeader.splice(headerIndex, 1);
            }
        }
        return tableHeader
    }

    return (
        <>
            {props.hasSearched ?
                <SearchTable
                    headers={getTableHeader()}
                    isLoading={!(!isLoading && props.requisitions)}
                    skeletonRow={<RequisitionLineSkeleton hideType={props.hideType}/>}
                    skeletonCount={Math.min(props.perPage, props.totalCount ? props.totalCount : Infinity)}
                    count={props.requisitions ? props.requisitions.data.length : 0}
                    resourceName={resourceName}
                    resourceIconFont={resourceIcon}
                    body={props.requisitions && props.requisitions.data.map((requisition, index) => 
                        <RequisitionRow
                            requisition={requisition}
                            originator={findUser(userData, requisition.data.created_by_id)}
                            recipient={findUser(userData, requisition.data.recipient_id)}
                            costCentre={findCostCentre(costCentreData, requisition.data.cost_centre_id)}
                            hideType={props.hideType}
                            key={index}
                        />
                    )}
                />
                :
                <SearchHelperText
                    iconFont={resourceIcon}
                    text="Search requisitions by number"
                />
            }
            {(!props.isRequisitionLoading && props.hasSearched && props.requisitions) && <PaginationNavigation
                data={props.requisitions.data}
                totalCount={props.requisitions.total_count}
                perPage={props.requisitions.pages.per_page} 
                resourceName={resourceName} 
                prefix="requisitions"            
            />}
        </>
    )
}

export default RequisitionList