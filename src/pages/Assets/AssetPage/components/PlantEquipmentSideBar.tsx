import { Dispatch, SetStateAction, useEffect, useState } from "react"
import PermsProtectedComponent from "../../../../components/PermsProtectedComponent"
import SideBarButton from "../../../../components/ui/Buttons/SideBarButton/SideBarButton"
import SideBarModule from "../../../../components/ui/Containers/SideBarModule/SideBarModule"
import { AssetResponseData } from "../../../../types/asset.types"
import { PlantEquipmentActivityCollectionResponse } from "../../../../types/plantEquipmentActivity.types"
import { PlantEquipmentTypeResponseData } from "../../../../types/plantEquipmentTypes.types"
import getAPI from "../../../../utils/getAPI"
import ExportResource from "../../../CustomerAdmin/Contacts/ContactPage/components/ContactSideBar/components/ContactDeactivate/ExportResource"
import PlantEquipmentAssignment from "./AssetSideBar/components/PlantEquipmentAssignment/PlantEquipmentAssignment"
import PlantEquipmentAssociatedResources from "./AssetSideBar/components/PlantEquipmentAssociatedResources/PlantEquipmentAssociatedResources"
import PlantEquipmentCalibration from "./AssetSideBar/components/PlantEquipmentCalibration/PlantEquipmentCalibration"
import PlantEquipmentDeactivate from "./AssetSideBar/components/PlantEquipmentDeactivate/PlantEquipmentDeactivate"
import PlantEquipmentInspection from "./AssetSideBar/components/PlantEquipmentInspection/PlantEquipmentInspection"
import PlantEquipmentMaintenance from "./AssetSideBar/components/PlantEquipmentMaintenance/PlantEquipmentMaintenance"
import PlantEquipmentPATest from "./AssetSideBar/components/PlantEquipmentPATest/PlantEquipmentPATest"
import PlantEquipmentSideBarSkeleton from "./AssetSideBar/components/PlantEquipmentSideBarSkeleton"

const PlantEquipmentSideBar = (props: {
    asset: AssetResponseData | undefined,
    setPlantEquipmentData: Dispatch<SetStateAction<AssetResponseData | undefined>>,
    plantEquipmentType: PlantEquipmentTypeResponseData | undefined,
    isEditMode: boolean,
    setIsEditMode: Dispatch<SetStateAction<boolean>>,
}) => {

    // Data States
    const [isActivityLoading, setIsActivityLoading] = useState(true);
    const [activityData, setActivityData] = useState<PlantEquipmentActivityCollectionResponse>();
    
    useEffect(() => {
        if (props.asset?.id === undefined) return;
        getActivity(props.asset.id);
    }, [JSON.stringify(props.asset)]);

    const getActivity = (plantEquipmentID: number) => {
        getAPI(`plant_equipment_activity`, {
            plant_equipment_id: plantEquipmentID,
            perPage: 1
        }, (response: any) => {
            const plantEquipmentActivityData: PlantEquipmentActivityCollectionResponse = response.data;
            setActivityData(plantEquipmentActivityData);
        }, setIsActivityLoading)    
    } 

    const isLoading = (
        isActivityLoading
    )

    return (
        !isLoading && props.asset && activityData ?
            !props.isEditMode ? <>
                {props.asset.data.is_active ? <>
                    <PermsProtectedComponent requiredPerms={{ engineer_assets: 2 }}>    
                        <SideBarModule title="Actions">
                            <SideBarButton 
                                text='Edit Plant/Tools' 
                                iconFont="edit" color="orange" 
                                clickEvent={() => props.setIsEditMode(true)}
                            />
                        </SideBarModule>
                        <PlantEquipmentAssignment
                            plantEquipmentID={props.asset.id}
                            userID={props.asset.data.assigned_to_user_id}
                            setPlantEquipmentData={props.setPlantEquipmentData}
                        />
                        {props.asset.data.requires_pa_test ? 
                            <PlantEquipmentPATest
                                plantEquipmentID={props.asset.id}
                                paTestFrequency={props.plantEquipmentType?.data.pa_test_frequency ? props.plantEquipmentType.data.pa_test_frequency : 12}
                                setPlantEquipmentData={props.setPlantEquipmentData}    
                            /> :
                            null
                        }
                        {props.asset.data.requires_calibration ? 
                            <PlantEquipmentCalibration 
                                plantEquipmentID={props.asset.id}
                                calibrationTestFrequency={props.plantEquipmentType?.data.calibration_test_frequency ? props.plantEquipmentType.data.calibration_test_frequency : 12}
                                setPlantEquipmentData={props.setPlantEquipmentData}    
                            /> :
                            null
                        }
                        {props.asset.data.requires_inspection ? 
                            <PlantEquipmentInspection
                            plantEquipmentID={props.asset.id}
                            inspectionFrequency={props.plantEquipmentType?.data.inspection_frequency ? props.plantEquipmentType.data.inspection_frequency : 12}
                            setPlantEquipmentData={props.setPlantEquipmentData}    
                            /> :
                            null
                        }
                        {props.asset.data.requires_maintenance ? 
                            <PlantEquipmentMaintenance
                            plantEquipmentID={props.asset.id}
                            maintenanceFrequency={props.plantEquipmentType?.data.maintenance_frequency ? props.plantEquipmentType.data.maintenance_frequency : 12}
                            setPlantEquipmentData={props.setPlantEquipmentData}    
                            /> :
                            null
                        }
                    </PermsProtectedComponent>
                </> : null}
                <PlantEquipmentAssociatedResources
                    plantEquipmentID={props.asset.id}
                    activityCount={activityData.total_count}
                />
                <PermsProtectedComponent requiredPerms={{ engineer_assets: 2 }}>
                    <PlantEquipmentDeactivate
                        plantEquipmentID={props.asset.id}
                        isAssigned={props.asset.data.assigned_to_user_id !== null}
                        reactivate={!props.asset.data.is_active}
                        setPlantEquipmentData={props.setPlantEquipmentData}
                    />
                </PermsProtectedComponent>

                <ExportResource
                    resourceData={props.asset}
                    resourceName='Plant/Tool'
                />
            </> 
            :
            // Edit Mode
            <SideBarModule title='Actions'>
                <SideBarButton 
                    text='Abandon Edit'
                    color="grey"
                    iconFont='cancel'
                    clickEvent={() => props.setIsEditMode(false)}
                />
            </SideBarModule>
        : 
        // Skeleton
        <PlantEquipmentSideBarSkeleton/>
    )
}

export default PlantEquipmentSideBar