import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AssignedLabel from "../../../components/ui/AssignedLabel/AssignedLabel";
import OuterContainer from "../../../components/ui/Containers/OuterContainer/OuterContainer";
import getExpiryColor from "../../../components/ui/ExpiryDateLabel/getExpiryColor";
import Label from "../../../components/ui/General/Label/Label";
import Skeleton from "../../../components/ui/General/Skeleton/Skeleton";
import InactiveLabel from "../../../components/ui/InactiveLabel/InactiveLabel";
import { AssetCollectionResponse, AssetResponseData } from "../../../types/asset.types";
import { DepartmentResponseData } from "../../../types/department.types";
import { PlantEquipmentActivityCollectionResponse, PlantEquipmentActivityResponseData } from "../../../types/plantEquipmentActivity.types";
import { PlantEquipmentDocumentsResponseData, PlantEquipmentDocumentsCollectionResponse } from "../../../types/plantEquipmentDocument.types";
import { PlantEquipmentTypeResponseData } from "../../../types/plantEquipmentTypes.types";
import { SupplierManufacturerResponseData } from "../../../types/supplierManufacturer.types";
import { UserResponseData } from "../../../types/user.types";
import getAPI from "../../../utils/getAPI";
import AssetOwnerLabel from "../components/AssetOwnerLabel";
import EditPlantEquipmentForm from "./components/EditPlantEquipmentForm";
import AssetInformation from "./components/PlantEquipmentInformation";
import PlantEquipmentInformationSkeleton from "./components/PlantEquipmentInformationSkeleton";
import AssetSideBar from "./components/PlantEquipmentSideBar";
import getCalibrationTitle from "./utils/getCalibrationTitle";
import getInspectionTitle from "./utils/getInspectionTitle";
import getMaintenanceTitle from "./utils/getMaintenanceTitle";
import getPATTitle from "./utils/getPATTitle";

const PlantEquipmentPage = ()  => {
    const { plantEquipmentCode } = useParams();

    // Data States 
    const [isPlantEquipmentLoading, setIsPlantEquipmentLoading] = useState(true);
    const [plantEquipmentData, setPlantEquipmentData] = useState<AssetResponseData>();
    const [isDepartmentLoading, setIsDepartmentLoading] = useState(false);
    const [departmentData, setDepartmentData] = useState<DepartmentResponseData>();
    const [isUserLoading, setIsUserLoading] = useState(false);
    const [userData, setUserData] = useState<UserResponseData>();
    const [isPlantEquipmentTypeLoading, setIsPlantEquipmentTypeLoading] = useState(false);
    const [plantEquipmentTypeData, setPlantEquipmentTypeData] = useState<PlantEquipmentTypeResponseData>();
    const [isManufacturerLoading, setIsManufacturerLoading] = useState(false);
    const [manufacturerData, setManufacturerData] = useState<SupplierManufacturerResponseData>();
    const [isAssignmentActivityLoading, setIsAssignmentActivityLoading] = useState(true);
    const [assignmentActivityData, setAssignmentActivityData] = useState<PlantEquipmentActivityResponseData>();
    const [isInactiveActivityLoading, setIsInactiveActivityLoading] = useState(false);
    const [inactiveActivityData, setInactiveActivityData] = useState<PlantEquipmentActivityResponseData>();

    // Edit States
    const [isEditMode, setIsEditMode] = useState(false);

    useEffect(() => {
        getPlantEquipment();
    }, [plantEquipmentCode]);

    useEffect(() => {
        if (plantEquipmentData === undefined) return;
        getAssignmentActivity(plantEquipmentData.id, plantEquipmentData.data.assigned_to_user_id !== null);
        if (!plantEquipmentData.data.is_active) getInactiveActivity(plantEquipmentData.id);
    }, [JSON.stringify(plantEquipmentData)]);

    useEffect(() => {
        if (plantEquipmentData === undefined) return;
        getPlantEquipmentType(plantEquipmentData.data.plant_equipment_type_id);
    }, [plantEquipmentData?.data.plant_equipment_type_id]);

    useEffect(() => {
        if (plantEquipmentData === undefined) return;
        if (plantEquipmentData.data.manufacturer_id) {
            getManufacturer(plantEquipmentData.data.manufacturer_id);
        } else {
            setManufacturerData(undefined);
        }
    }, [plantEquipmentData?.data.manufacturer_id]);

    useEffect(() => {
        if (plantEquipmentData === undefined) return;
        if (plantEquipmentData.data.department_id) {
            getDepartment(plantEquipmentData.data.department_id);
        } else {
            setDepartmentData(undefined);
        }
    }, [plantEquipmentData?.data.department_id]);

    useEffect(() => {
        if (plantEquipmentData === undefined) return 
        if (plantEquipmentData.data.assigned_to_user_id) {
            getUser(plantEquipmentData.data.assigned_to_user_id);
        } else {
            setUserData(undefined);
        }
    }, [plantEquipmentData?.data.assigned_to_user_id])

    const getPlantEquipment = () => {
        getAPI('assets', {
            codes: [plantEquipmentCode]
        }, (response: any) => {
            const plantEquipmentCollectionData: AssetCollectionResponse = response.data;
            const plantEquipmentData = plantEquipmentCollectionData.data[0]
            setPlantEquipmentData(plantEquipmentData);
        }, setIsPlantEquipmentLoading);
    }

    const getDepartment = (departmentID: number) => {
        getAPI(`departments/${departmentID}`, {}, (response: any) => {
            const departmentData: DepartmentResponseData = response.data;
            setDepartmentData(departmentData);
        }, setIsDepartmentLoading);
    }

    const getManufacturer = (manufacturerID: number) => {
        getAPI(`suppliers_manufacturers/${manufacturerID}`, {}, (response: any) => {
            const manufacturerData: SupplierManufacturerResponseData = response.data;
            setManufacturerData(manufacturerData);
        }, setIsManufacturerLoading);
    }

    const getUser = (userID: number) => {
        getAPI(`users/${userID}`, {}, (response: any) => {
            const userData: UserResponseData = response.data;
            setUserData(userData);
        }, setIsUserLoading);
    }

    const getPlantEquipmentType = (plantEquipmentTypeID: number) => {
        getAPI(`plant_equipment_types/${plantEquipmentTypeID}`, {}, (response: any) => {
            const plantEquipmentTypeData: PlantEquipmentTypeResponseData = response.data;
            setPlantEquipmentTypeData(plantEquipmentTypeData);
        }, setIsPlantEquipmentTypeLoading);
    }

    const getAssignmentActivity = (plantEquipmentID: number, isAssigned: boolean) => {
        getAPI(`plant_equipment_activity`, {
            plant_equipment_id: plantEquipmentID,
            type: !isAssigned ? 5 : 4,
            perPage: 1
        }, (response: any) => {
            const plantEquipmentActivityData: PlantEquipmentActivityCollectionResponse = response.data;
            setAssignmentActivityData(plantEquipmentActivityData.data[0]);
        }, setIsAssignmentActivityLoading)    
    } 

    const getInactiveActivity = (plantEquipmentID: number) => {
        getAPI(`plant_equipment_activity`, {
            plant_equipment_id: plantEquipmentID,
            type: 2,
            perPage: 1
        }, (response: any) => {
            const plantEquipmentActivityData: PlantEquipmentActivityCollectionResponse = response.data;
            setInactiveActivityData(plantEquipmentActivityData.data[0]);
        }, setIsInactiveActivityLoading)    
    } 

    const isHeaderLoading = (
        isPlantEquipmentLoading || 
        isPlantEquipmentTypeLoading 
    )

    const isLoading = (
        isPlantEquipmentLoading ||
        isDepartmentLoading || 
        isUserLoading ||
        isPlantEquipmentTypeLoading || 
        isAssignmentActivityLoading || 
        isInactiveActivityLoading || 
        isManufacturerLoading
    )

    return (
        <OuterContainer
            title='Plant/Tool'
            id={plantEquipmentCode}
            headerContent={
                !isHeaderLoading && plantEquipmentData && plantEquipmentTypeData ?
                    <div className="flex">
                        {!plantEquipmentData.data.is_active ? <InactiveLabel/> : null}
                        <Label iconFont="handyman" text={plantEquipmentTypeData.data.name} color="no-color"/>
                        <AssetOwnerLabel 
                            ownerType={plantEquipmentData.data.ownership_type}
                        />
                        <AssignedLabel 
                            isAssigned={plantEquipmentData.data.assigned_to_user_id !== null}
                        />
                        {plantEquipmentData.data.requires_pa_test && <Label 
                            iconFont="domain_verification"
                            text={getPATTitle(plantEquipmentData.data.next_pa_test)}
                            color={plantEquipmentData.data.next_pa_test ? getExpiryColor(plantEquipmentData.data.next_pa_test) : 'red'}
                        />}
                        {plantEquipmentData.data.requires_calibration && <Label 
                            iconFont="compass_calibration"
                            text={getCalibrationTitle(plantEquipmentData.data.next_calibration_test)}
                            color={plantEquipmentData.data.next_calibration_test ? getExpiryColor(plantEquipmentData.data.next_calibration_test) : 'red'}
                        />}
                        {plantEquipmentData.data.requires_inspection && <Label 
                            iconFont="assignment_turned_in"
                            text={getInspectionTitle(plantEquipmentData.data.next_inspection)}
                            color={plantEquipmentData.data.next_inspection ? getExpiryColor(plantEquipmentData.data.next_inspection) : 'red'}
                        />}
                        {plantEquipmentData.data.requires_maintenance && <Label 
                            iconFont="home_repair_service"
                            text={getMaintenanceTitle(plantEquipmentData.data.next_maintenance)}
                            color={plantEquipmentData.data.next_maintenance ? getExpiryColor(plantEquipmentData.data.next_maintenance) : 'red'}
                        />}
                    </div>
                    :
                    <div className="flex">
                        <Skeleton type='label'/>
                        <Skeleton type='label'/>
                        <Skeleton type='label'/>
                    </div>
            }
            bigID
            maxWidth={1050}
        >
            <div className="page-grid">
                <div className="page-main">
                    {!isLoading && plantEquipmentData && plantEquipmentTypeData ?
                        !isEditMode ? 
                            <AssetInformation
                                asset={plantEquipmentData}
                                manufacturer={manufacturerData}
                                department={departmentData}
                                user={userData}
                                plantEquipmentType={plantEquipmentTypeData}
                                lastAssignmentUpdate={assignmentActivityData?.data.created_at}
                                lastDeactivate={inactiveActivityData?.data.created_at}
                            /> :
                            <EditPlantEquipmentForm
                                plantEquipment={plantEquipmentData}
                                setPlantEquipmentData={setPlantEquipmentData}
                                manufacturer={manufacturerData}
                                department={departmentData}
                                plantEquipmentType={plantEquipmentTypeData}
                                disabledEdit={() => setIsEditMode(false)}
                            />
                        :
                        <PlantEquipmentInformationSkeleton/>
                    }
                </div>
                <div className="page-side">
                    <AssetSideBar
                        asset={plantEquipmentData}
                        setPlantEquipmentData={setPlantEquipmentData}
                        plantEquipmentType={plantEquipmentTypeData}
                        isEditMode={isEditMode}
                        setIsEditMode={setIsEditMode}
                    />
                </div>
            </div>
        </OuterContainer>
    )
}

export default PlantEquipmentPage