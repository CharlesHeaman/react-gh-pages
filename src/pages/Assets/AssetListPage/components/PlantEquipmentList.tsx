import { useEffect, useState } from "react"
import PaginationNavigation from "../../../../components/ui/PaginationNavigation/PaginationNavigation"
import SearchTable from "../../../../components/ui/SearchTable/SearchTable"
import { AssetCollectionResponse } from "../../../../types/asset.types"
import { PlantEquipmentTypeCollectionResponse, PlantEquipmentTypeResponseData } from "../../../../types/plantEquipmentTypes.types"
import { SupplierManufacturerCollectionResponse, SupplierManufacturerResponseData } from "../../../../types/supplierManufacturer.types"
import { UserCollectionResponse, UserResponseData } from "../../../../types/user.types"
import findPlantEquipmentType from "../../../../utils/findPlantEquipmentType"
import findSupplierManufacturer from "../../../../utils/findSupplierManufacturer"
import findUser from "../../../../utils/findUser"
import getAPI from "../../../../utils/getAPI"
import PlantEquipmentRow from "./PlantEquipmentRow"
import PlantEquipmentRowSkeleton from "./PlantEquipmentRowSkeleton"
import SearchHelperText from "../../../../components/ui/SearchHelperText/SearchHelperText"

const PlantEquipmentList = (props: {
    hasSearched: boolean,
    isPlantEquipmentLoading: boolean,
    plantEquipment: AssetCollectionResponse | undefined,
    perPage: number,
    totalCount?: number,
    showAdvancedSearch?: () => void
    hideAssignedTo?: boolean,
    hideType?: boolean,
    hideManufacturer?: boolean,
    hidePATestingDue?: boolean,
    hideCalibrationDue?: boolean,
    hideInspectionDue?: boolean,
    hideMaintenanceDue?: boolean,

}) => {

    // Data States
    const [isUsersLoading, setIsUsersLoading] = useState(false);
    const [userData, setUserData] = useState<Array<UserResponseData>>([]);
    const [isTypeLoading, setIsTypeLoading] = useState(false);
    const [typeData, setTypeData] = useState<Array<PlantEquipmentTypeResponseData>>([]);
    const [isManufacturerLoading, setIsManufacturerLoading] = useState(false);
    const [manufacturerData, setManufacturerData] = useState<Array<SupplierManufacturerResponseData>>([]);

    // Resource Constants
    const resourceName = "plant/tools";
    const resourceIcon = "handyman";    

    useEffect(() => {
        !props.hideAssignedTo && setIsUsersLoading(true);
        !props.hideType && setIsTypeLoading(true);
        !props.hideManufacturer && setIsManufacturerLoading(true);
    }, [props.isPlantEquipmentLoading])

    useEffect(() => {
        if (props.plantEquipment && props.plantEquipment.data.length > 0) {
            !props.hideAssignedTo && getUsers([...new Set(props.plantEquipment.data.map(plantEquipment => plantEquipment.data.assigned_to_user_id))]);
            !props.hideType && getTypes([...new Set(props.plantEquipment.data.map(plantEquipment => plantEquipment.data.plant_equipment_type_id))]);
            !props.hideManufacturer && getManufacturers([...new Set(props.plantEquipment.data.map(plantEquipment => plantEquipment.data.manufacturer_id))]);
        } else {
            !props.hideAssignedTo && setIsUsersLoading(false);
            !props.hideType && setIsTypeLoading(false);
            !props.hideManufacturer && setIsManufacturerLoading(false);
        }
    }, [props.plantEquipment])


    const getUsers = (userIDs: Array<number | null>) => {
        getAPI('users', {
            ids: userIDs
        }, (response: any) => {
            const userData: UserCollectionResponse = response.data;
            setUserData(userData.data)
        }, setIsUsersLoading)
    }

    const getTypes = (typeIDs: Array<number | null>) => {
        getAPI('plant_equipment_types', {
            ids: typeIDs
        }, (response: any) => {
            const typeData: PlantEquipmentTypeCollectionResponse = response.data;
            setTypeData(typeData.data)
        }, setIsTypeLoading)
    }

    const getManufacturers = (manufacturerIDs: Array<number | null>) => {
        getAPI('suppliers_manufacturers', {
            ids: manufacturerIDs
        }, (response: any) => {
            const manufacturerData: SupplierManufacturerCollectionResponse = response.data;
            setManufacturerData(manufacturerData.data)
        }, setIsManufacturerLoading)
    }

    const isLoading = (
        props.isPlantEquipmentLoading ||
        isUsersLoading || 
        isTypeLoading || 
        isManufacturerLoading
    )

    const getTableHeader = () => {
        var tableHeader = ['Code', 'Description', 'Manufacturer', 'Model', 'Type', 'PA Test Due', 'Calibration Due', 'Inspection Due', 'Maintenance Due', 'Assigned To'];
        if (props.hideAssignedTo) {
            tableHeader.splice(tableHeader.indexOf('Assigned To'), 1);
        }
        if (props.hideType) {
            tableHeader.splice(tableHeader.indexOf('Type'), 1);
        }
        if (props.hideManufacturer) {
            tableHeader.splice(tableHeader.indexOf('Manufacturer'), 1);
        }
        if (props.hidePATestingDue) {   
            tableHeader.splice(tableHeader.indexOf('PA Test Due'), 1);
        }
        if (props.hideInspectionDue) {
            tableHeader.splice(tableHeader.indexOf('Inspection Due'), 1);
        }
        if (props.hideCalibrationDue) {
            tableHeader.splice(tableHeader.indexOf('Calibration Due'), 1);
        }
        if (props.hideMaintenanceDue) {
            tableHeader.splice(tableHeader.indexOf('Maintenance Due'), 1);
        }
        return tableHeader
    }

    return (
        <div>
            {props.hasSearched ?
                <SearchTable
                    headers={getTableHeader()}
                    isLoading={!(!isLoading && props.plantEquipment)}
                    skeletonRow={<PlantEquipmentRowSkeleton hideAssignedTo={props.hideAssignedTo} hideType={props.hideType} hideManufacturer={props.hideManufacturer} hidePATestingDue={props.hidePATestingDue} hideCalibrationDue={props.hideCalibrationDue} hideInspectionDue={props.hideInspectionDue} hideMaintenanceDue={props.hideMaintenanceDue}/>}
                    skeletonCount={Math.min(props.perPage, props.totalCount ? props.totalCount : Infinity)}
                    count={props.plantEquipment ? props.plantEquipment.data.length : 0}
                    resourceName={resourceName}
                    resourceIconFont={resourceIcon}
                    body={props.plantEquipment && props.plantEquipment.data.map((plantEquipment, index) => 
                        <PlantEquipmentRow
                            asset={plantEquipment}
                            user={plantEquipment.data.assigned_to_user_id ? findUser(userData, plantEquipment.data.assigned_to_user_id) : undefined}
                            manufacturer={plantEquipment.data.manufacturer_id ? findSupplierManufacturer(manufacturerData, plantEquipment.data.manufacturer_id) : undefined}
                            type={findPlantEquipmentType(typeData, plantEquipment.data.plant_equipment_type_id)}
                            hideAssignedTo={props.hideAssignedTo} 
                            hideType={props.hideType}
                            hideManufacturer={props.hideManufacturer}
                            hidePATestingDue={props.hidePATestingDue}
                            hideCalibrationDue={props.hideCalibrationDue}
                            hideInspectionDue={props.hideInspectionDue}
                            hideMaintenanceDue={props.hideMaintenanceDue}
                            key={index}
                        />
                    )}
                />
                :
                props.showAdvancedSearch ? <SearchHelperText
                    iconFont={resourceIcon}
                    text="Search plant/tools by description"
                    showAdvanced={props.showAdvancedSearch}
                /> : null
            }
            {(!isLoading && props.plantEquipment) && <PaginationNavigation
                data={props.plantEquipment.data}
                totalCount={props.plantEquipment.total_count}
                perPage={props.plantEquipment.pages.per_page} 
                resourceName={resourceName}
                prefix="plant_equipment"
            />}
        </div>
    )
}

export default PlantEquipmentList