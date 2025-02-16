import { useEffect, useState } from "react"
import PaginationNavigation from "../../../../components/ui/PaginationNavigation/PaginationNavigation"
import SearchTable from "../../../../components/ui/SearchTable/SearchTable"
import { CostCentreCollectionResponse, CostCentreResponseData } from "../../../../types/costCentres.types"
import { UserCollectionResponse, UserResponseData } from "../../../../types/user.types"
import { VehicleCollectionResponse } from "../../../../types/vehicles.types"
import findCostCentre from "../../../../utils/findCostCentre"
import findUser from "../../../../utils/findUser"
import getAPI from "../../../../utils/getAPI"
import VehicleRow from "./VehicleRow"
import VehicleRowSkeleton from "./VehicleRowSkeleton"

const VehicleList = (props: {
    isVehiclesLoading: boolean,
    vehicles: VehicleCollectionResponse | undefined,
    perPage: number,
    totalCount?: number,
    showAdvancedSearch?: () => void
    hideAssignedTo?: boolean,
    hideCostCentre?: boolean,
}) => {
    // Data States
    const [isUsersLoading, setIsUsersLoading] = useState(false);
    const [userData, setUserData] = useState<Array<UserResponseData>>([]);
    const [isCostCentresLoading, setIsCostCentresLoading] = useState(false);
    const [costCentreData, setCostCentreData] = useState<Array<CostCentreResponseData>>([]);

    // Resource Constants
    const resourceName = 'vehicles';
    const resourceIcon = 'directions_car';

    useEffect(() => {
        !props.hideAssignedTo && setIsUsersLoading(true);
        !props.hideCostCentre && setIsCostCentresLoading(true);
    }, [props.isVehiclesLoading]);

    useEffect(() => {
        if (props.vehicles && props.vehicles.data.length > 0) {
            !props.hideAssignedTo && getUsers([...new Set(props.vehicles.data.map(vehicle => vehicle.data.user_id))]);
            !props.hideCostCentre && getCostCentres([...new Set(props.vehicles.data.map(vehicle => vehicle.data.cost_centre_id))])
        } else {
            !props.hideAssignedTo && setIsUsersLoading(false);
            !props.hideCostCentre && setIsCostCentresLoading(false);
        }
    }, [props.vehicles]);


    const getUsers = (userIDs: Array<number | null>) => {
        getAPI('users', {
            ids: userIDs
        }, (response: any) => {
            const userData: UserCollectionResponse = response.data;
            setUserData(userData.data)
        }, setIsUsersLoading)
    }

    const getCostCentres = (costCentreIDs: Array<number>) => {
        getAPI('cost_centres', {
            ids: costCentreIDs
        }, (response: any) => {
            const costCentreData: CostCentreCollectionResponse = response.data;
            setCostCentreData(costCentreData.data)
        }, setIsCostCentresLoading)
    }

    const isLoading = (
        props.isVehiclesLoading ||
        isUsersLoading ||
        isCostCentresLoading
    )

    const getTableHeader = () => {
        var tableHeader = ['Registration', 'Make', 'Model', 'Registration Date', 'MOT Due', 'Tax Due', 'Assignment', 'Cost Centre'];
        if (props.hideAssignedTo) {
            var headerIndex = tableHeader.indexOf('Assignment');
            if (headerIndex !== -1) {
                tableHeader.splice(headerIndex, 1);
            }
        }
        if (props.hideCostCentre) {
            var headerIndex = tableHeader.indexOf('Cost Centre');
            if (headerIndex !== -1) {
                tableHeader.splice(headerIndex, 1);
            }
        }
        return tableHeader
    }
    
    return (
        <div>
            <SearchTable
                headers={getTableHeader()}
                isLoading={!(!isLoading && props.vehicles)}
                skeletonRow={<VehicleRowSkeleton hideAssignedTo={props.hideAssignedTo} hideCostCentre={props.hideCostCentre}/>}
                skeletonCount={Math.min(props.perPage, props.totalCount ? props.totalCount : Infinity)}
                count={props.vehicles ? props.vehicles.data.length : 0}
                resourceName={resourceName}
                resourceIconFont={resourceIcon}
                body={props.vehicles && props.vehicles.data.map((vehicle, index) => 
                    <VehicleRow
                        vehicle={vehicle}
                        user={vehicle.data.user_id ? findUser(userData, vehicle.data.user_id) : undefined}
                        costCentre={findCostCentre(costCentreData, vehicle.data.cost_centre_id)}
                        hideAssignedTo={props.hideAssignedTo}
                        hideCostCentre={props.hideCostCentre}
                        key={index}
                    />
                )}
            />
            {(!isLoading && props.vehicles) && <PaginationNavigation
                data={props.vehicles.data}
                totalCount={props.vehicles.total_count}
                perPage={props.vehicles.pages.per_page}
                resourceName={resourceName}
                prefix="vehicles"
            />}
        </div>
    )
}

export default VehicleList