import { useEffect, useState } from "react"
import PaginationNavigation from "../../../../components/ui/PaginationNavigation/PaginationNavigation"
import SearchHelperText from "../../../../components/ui/SearchHelperText/SearchHelperText"
import SearchTable from "../../../../components/ui/SearchTable/SearchTable"
import { GasBottleCollectionResponse } from "../../../../types/gasBottle.types"
import { RefrigerantCollectionResponse, RefrigerantResponseData } from "../../../../types/refrigerant.types"
import { SupplierManufacturerCollectionResponse, SupplierManufacturerResponseData } from "../../../../types/supplierManufacturer.types"
import { UserCollectionResponse, UserResponseData } from "../../../../types/user.types"
import findRefrigerant from "../../../../utils/findRefrigerant"
import findSupplierManufacturer from "../../../../utils/findSupplierManufacturer"
import findUser from "../../../../utils/findUser"
import getAPI from "../../../../utils/getAPI"
import GasBottleRow from "./GasBottleRow"
import GasBottleRowSkeleton from "./GasBottleRowSkeleton"

const GasBottleList = (props: {
    hasSearched: boolean,
    isGasBottlesLoading: boolean,
    gasBottles: GasBottleCollectionResponse | undefined,
    perPage: number,
    totalCount?: number,
    showAdvancedSearch?: () => void
    hideRefrigerant?: boolean,
    hideAssignedTo?: boolean,
    hideSupplier?: boolean,
    hideStatus?: boolean,
    isConsumable?: boolean,
    isReturn?: boolean,
}) => {
    // Data States
    const [isRefrigerantsLoading, setIsRefrigerantsLoading] = useState(false);
    const [refrigerantData, setRefrigerantData] = useState<Array<RefrigerantResponseData>>([]);
    const [isUsersLoading, setIsUsersLoading] = useState(false);
    const [usersData, setUsersData] = useState<Array<UserResponseData>>([]);
    const [isSuppliersLoading, setIsSuppliersLoading] = useState(false);
    const [supplierData, setSupplierData] = useState<Array<SupplierManufacturerResponseData>>([]);

    // Resource Constants
    const resourceName = "bottles";
    const resourceIcon = "propane_tank";

    useEffect(() => {
        !props.hideRefrigerant && setIsRefrigerantsLoading(true);
        !props.hideAssignedTo && setIsUsersLoading(true);
        !props.hideSupplier && setIsSuppliersLoading(true);
    }, [props.isGasBottlesLoading])

    useEffect(() => {
        if (props.gasBottles && props.gasBottles.data.length > 0) {
            !props.hideRefrigerant && getRefrigerants([...new Set(props.gasBottles.data.map(gasBottle => gasBottle.data.refrigerant_id))]);
            !props.hideAssignedTo && getUsers([...new Set(props.gasBottles.data.map(gasBottle => gasBottle.data.assigned_to_id))]);
            !props.hideSupplier && getSuppliersManufacturers([...new Set(props.gasBottles.data.map(gasBottle => gasBottle.data.supplier_id))]);
        } else {
            !props.hideRefrigerant && setIsRefrigerantsLoading(false);
            !props.hideAssignedTo && setIsUsersLoading(false);
            !props.hideSupplier && setIsSuppliersLoading(false);
        }
    }, [props.gasBottles])

    const getRefrigerants = (refrigerantIDs: Array<number>) => {
        getAPI('refrigerants', {
            ids: refrigerantIDs
        }, (response: any) => {
            const refrigerantData: RefrigerantCollectionResponse = response.data;
            setRefrigerantData(refrigerantData.data)
        }, setIsRefrigerantsLoading)
    }

    const getUsers = (userIDs: Array<number | null>) => {
        getAPI('users', {
            ids: userIDs
        }, (response: any) => {
            const userData: UserCollectionResponse = response.data;
            setUsersData(userData.data)
        }, setIsUsersLoading)
    }

    const getSuppliersManufacturers = (supplierManufacturerIDs: Array<number>) => {
        getAPI('suppliers_manufacturers', {
            ids: supplierManufacturerIDs
        }, (response: any) => {
            const supplierData: SupplierManufacturerCollectionResponse = response.data;
            setSupplierData(supplierData.data)
        }, setIsSuppliersLoading)
    }

    const isLoading = (
        props.isGasBottlesLoading || 
        isUsersLoading ||
        isRefrigerantsLoading || 
        isSuppliersLoading
    )

    const getTableHeader = () => {
        var tableHeader = ['Code', 'Number', 'Type', props.isConsumable ? 'Gas' : 'Refrigerant', 'Supplier', 'Refrigerant Weight', 'Rental Expiration', 'Assigned To', 'Status'];
        if (props.hideRefrigerant) {
            var headerIndex = tableHeader.indexOf('Refrigerant');
            if (headerIndex !== -1) {
                tableHeader.splice(headerIndex, 1);
            }
        }
        if (props.hideAssignedTo) {
            var headerIndex = tableHeader.indexOf('Assigned To');
            if (headerIndex !== -1) {
                tableHeader.splice(headerIndex, 1);
            }
        }
        if (props.hideSupplier) {
            var headerIndex = tableHeader.indexOf('Supplier');
            if (headerIndex !== -1) {
                tableHeader.splice(headerIndex, 1);
            }
        }
        if (props.hideStatus) {
            var headerIndex = tableHeader.indexOf('Status');
            if (headerIndex !== -1) {
                tableHeader.splice(headerIndex, 1);
            }
        }
        if (props.isConsumable) {
            var headerIndex = tableHeader.indexOf('Type');
            if (headerIndex !== -1) {
                tableHeader.splice(headerIndex, 1);
            }
            var headerIndex = tableHeader.indexOf('Refrigerant Weight');
            if (headerIndex !== -1) {
                tableHeader.splice(headerIndex, 1);
            }
        }
        if (props.isReturn) {
            var headerIndex = tableHeader.indexOf('Status');
            if (headerIndex !== -1) {
                tableHeader.splice(headerIndex, 1);
            }
            var headerIndex = tableHeader.indexOf('Assigned To');
            if (headerIndex !== -1) {
                tableHeader.splice(headerIndex, 1);
            }
        }
        return tableHeader
    }

    return (
        <div>
            {props.hasSearched ?
                <SearchTable
                    headers={getTableHeader()}
                    isLoading={!(!isLoading && props.gasBottles)}
                    skeletonRow={<GasBottleRowSkeleton hideRefrigerant={props.hideRefrigerant} hideAssignedTo={props.hideAssignedTo} hideSupplier={props.hideSupplier} hideStatus={props.hideStatus} isConsumable={props.isConsumable} isReturn={props.isReturn}/>}
                    skeletonCount={Math.min(props.perPage, props.totalCount ? props.totalCount : Infinity)}
                    count={props.gasBottles ? props.gasBottles.data.length : 0}
                    resourceName={resourceName}
                    resourceIconFont={resourceIcon}
                    body={props.gasBottles && props.gasBottles.data.map((gasBottle, index) => 
                        <GasBottleRow
                            gasBottle={gasBottle}
                            refrigerant={findRefrigerant(refrigerantData, gasBottle.data.refrigerant_id)}
                            user={gasBottle.data.assigned_to_id ? findUser(usersData, gasBottle.data.assigned_to_id) : undefined}
                            supplier={findSupplierManufacturer(supplierData, gasBottle.data.supplier_id)}
                            hideRefrigerant={props.hideRefrigerant}
                            hideAssignedTo={props.hideAssignedTo}
                            hideSupplier={props.hideSupplier}
                            hideStatus={props.hideStatus}
                            isConsumable={props.isConsumable}
                            isReturn={props.isReturn}
                            key={index}
                        />
                    )}
                />
                :
                props.showAdvancedSearch ? <SearchHelperText
                    iconFont={resourceIcon}
                    text="Search bottles by code or number"
                    showAdvanced={props.showAdvancedSearch}
                /> : null
            }
            {(!isLoading && props.hasSearched && props.gasBottles && !props.isReturn) && <PaginationNavigation
                data={props.gasBottles.data}
                totalCount={props.gasBottles.total_count}
                perPage={props.gasBottles.pages.per_page}
                resourceName={resourceName}
                prefix="gas_bottles"
            />}
        </div>
    )
}

export default GasBottleList