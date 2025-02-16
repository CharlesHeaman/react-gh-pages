import { Dispatch, SetStateAction, useEffect, useState } from "react";
import SideBarButton from "../../../../../components/ui/Buttons/SideBarButton/SideBarButton";
import SideBarModule from "../../../../../components/ui/Containers/SideBarModule/SideBarModule";
import { AssetCollectionResponse } from "../../../../../types/asset.types";
import { PlantEquipmentTypeActivityCollectionResponse } from "../../../../../types/PlantEquipmentTypeActivity.types";
import { PlantEquipmentTypeResponseData } from "../../../../../types/plantEquipmentTypes.types";
import getAPI from "../../../../../utils/getAPI";
import PlantEquipmentTypeAssociatedData from "./components/PlantEquipmentTypeAssociatedData/PlantEquipmentTypeAssociatedData";
import PlantEquipmentTypeDeactivate from "./components/PlantEquipmentTypeDeactivate";
import PlantEquipmentTypeSideBarSkeleton from "./components/PlantEquipmentTypeSideBarSkeleton";
import ExportResource from "../../../../CustomerAdmin/Contacts/ContactPage/components/ContactSideBar/components/ContactDeactivate/ExportResource";
import PermsProtectedComponent from "../../../../../components/PermsProtectedComponent";

const PlantEquipmentTypeSideBar = (props: {
    plantEquipmentType: PlantEquipmentTypeResponseData | undefined,
    setPlantEquipmentTypeData: Dispatch<SetStateAction<PlantEquipmentTypeResponseData | undefined>>,
    isEditMode: boolean,
    setIsEditMode: Dispatch<SetStateAction<boolean>>
}) => {

    const [isPlantEquipmentLoading, setIsPlantEquipmentLoading] = useState(true);
    const [plantEquipmentData, setPlantEquipmentData] = useState<AssetCollectionResponse>();
    const [isActivityLoading, setIsActivityLoading] = useState(true);
    const [activityData, setActivityData] = useState<PlantEquipmentTypeActivityCollectionResponse>();

    useEffect(() => {
        if (props.plantEquipmentType?.id === undefined) return;
        getPlantEquipment(props.plantEquipmentType?.id);
    }, [props.plantEquipmentType?.id]);

    useEffect(() => {
        if (props.plantEquipmentType?.id === undefined) return;
        getActivity(props.plantEquipmentType.id);
    }, [JSON.stringify(props.plantEquipmentType)]);

    const getPlantEquipment = (plantEquipmentTypeID: number) => {
        getAPI(`assets`, {
            plant_equipment_type_id: plantEquipmentTypeID,
            is_active: true,
            perPage: 1
        }, (response: any) => {
            const plantEquipmentData: AssetCollectionResponse = response.data;
            setPlantEquipmentData(plantEquipmentData);
        }, setIsPlantEquipmentLoading);
    }

    const getActivity = (plantEquipmentTypeID: number) => {
        getAPI(`plant_equipment_type_activity`, {
            plant_equipment_type_id: plantEquipmentTypeID,
            perPage: 1
        }, (response: any) => {
            const plantEquipmentTypeActivityData: PlantEquipmentTypeActivityCollectionResponse = response.data;
            setActivityData(plantEquipmentTypeActivityData);
        }, setIsActivityLoading)    
    } 

    const isSideBarLoading = (
        isPlantEquipmentLoading || 
        isActivityLoading
    )

    return (
        !isSideBarLoading && props.plantEquipmentType && plantEquipmentData && activityData ? 
            !props.isEditMode ?  <>
                {props.plantEquipmentType.data.is_active ?
                    <PermsProtectedComponent requiredPerms={{ system: 2 }}>
                        <SideBarModule title='Actions'>
                            <SideBarButton 
                                text='Edit Plant/Tools Type'
                                color="orange"
                                iconFont='edit'
                                clickEvent={() => props.setIsEditMode(true)}
                            />
                        </SideBarModule>        
                    </PermsProtectedComponent>
                : null}
                <PlantEquipmentTypeAssociatedData 
                    plantEquipmentTypeID={props.plantEquipmentType.id} 
                    plantEquipmentCount={plantEquipmentData.total_count}          
                    activityCount={activityData.total_count}      
                />
                <PermsProtectedComponent requiredPerms={{ system: 2 }}>
                    <PlantEquipmentTypeDeactivate 
                        plantEquipmentTypeID={props.plantEquipmentType.id} 
                        setPlantEquipmentTypeData={props.setPlantEquipmentTypeData}
                        reactivate={!props.plantEquipmentType.data.is_active} 
                    /> 
                </PermsProtectedComponent>

                <ExportResource
                    resourceName="plant_equipment_type"
                    resourceData={props.plantEquipmentType}
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
        <PlantEquipmentTypeSideBarSkeleton/>
    )
}

export default PlantEquipmentTypeSideBar