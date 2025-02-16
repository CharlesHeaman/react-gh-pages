import { Dispatch, SetStateAction, useEffect, useState } from "react";
import SideBarButton from "../../../../components/ui/Buttons/SideBarButton/SideBarButton";
import SideBarModule from "../../../../components/ui/Containers/SideBarModule/SideBarModule";
import { EquipmentCollectionResponse } from "../../../../types/equipment.types";
import { EquipmentTypeResponseData } from "../../../../types/equipmentType.types";
import getAPI from "../../../../utils/getAPI";
import EquipmentTypeSideBarSkeleton from "./EquipmentTypeSideBarSkeleton";
import EquipmentTypeDeactivate from "./EquipmentTypeDeactivate";
import EquipmentTypeAssociatedData from "./EquipmentTypeAssociatedData/EquipmentTypeAssociatedData";
import { EquipmentTypeActivityCollectionResponse } from "../../../../types/equipmentTypeActivity.types";
import ExportResource from "../../../CustomerAdmin/Contacts/ContactPage/components/ContactSideBar/components/ContactDeactivate/ExportResource";
import PermsProtectedComponent from "../../../../components/PermsProtectedComponent";

const EquipmentTypeSideBar = (props: {
    equipmentType: EquipmentTypeResponseData | undefined,
    setEquipmentTypeData: Dispatch<SetStateAction<EquipmentTypeResponseData | undefined>>,
    isEditMode: boolean,
    setIsEditMode: Dispatch<SetStateAction<boolean>>
}) => {

    const [isEquipmentLoading, setIsEquipmentLoading] = useState(true);
    const [equipmentData, setEquipmentData] = useState<EquipmentCollectionResponse>();
    const [isActivityLoading, setIsActivityLoading] = useState(true);
    const [activityData, setActivityData] = useState<EquipmentTypeActivityCollectionResponse>();

    useEffect(() => {
        if (props.equipmentType?.id === undefined) return;
        getEquipment(props.equipmentType.id);
    }, [props.equipmentType?.id]);

    useEffect(() => {
        if (props.equipmentType?.id === undefined) return;
        getActivity(props.equipmentType.id);
    }, [JSON.stringify(props.equipmentType)]);

    const getEquipment = (equipmentTypeID: number) => {
        getAPI(`equipment`, {
            equipment_type_id: equipmentTypeID,
            is_active: true,
            perPage: 1
        }, (response: any) => {
            const equipmentTypeData: EquipmentCollectionResponse = response.data;
            setEquipmentData(equipmentTypeData);
        }, setIsEquipmentLoading);
    }

    const getActivity = (equipment_type_id: number) => {
        getAPI(`equipment_type_activity`, {
            equipment_type_id: equipment_type_id,
            perPage: 1
        }, (response: any) => {
            const costCentreActivityData: EquipmentTypeActivityCollectionResponse = response.data;
            setActivityData(costCentreActivityData);
        }, setIsActivityLoading)    
    } 

    const isSideBarLoading = (
        isEquipmentLoading ||
        isActivityLoading
    )

    return (
        !isSideBarLoading && props.equipmentType && equipmentData && activityData ? 
            !props.isEditMode ?  <>
                {props.equipmentType.data.is_active ?
                    <PermsProtectedComponent requiredPerms={{ system: 2 }}>
                        <SideBarModule title='Actions'>
                            <SideBarButton 
                                text='Edit Equipment Type'
                                color="orange"
                                iconFont='edit'
                                clickEvent={() => props.setIsEditMode(true)}
                            />
                        </SideBarModule>        
                    </PermsProtectedComponent>
                : null}
                <EquipmentTypeAssociatedData
                    equipmentTypeID={props.equipmentType.id}
                    equipmentCount={equipmentData.total_count}
                    activityCount={activityData.total_count}
                />
                <PermsProtectedComponent requiredPerms={{ system: 2 }}>
                    <EquipmentTypeDeactivate 
                        equipmentTypeID={props.equipmentType.id} 
                        setEquipmentTypeData={props.setEquipmentTypeData}
                        reactivate={!props.equipmentType.data.is_active} 
                    />
                </PermsProtectedComponent>

                <ExportResource
                    resourceData={props.equipmentType}
                    resourceName='Equipment Type'
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
        <EquipmentTypeSideBarSkeleton/>
    )
}

export default EquipmentTypeSideBar