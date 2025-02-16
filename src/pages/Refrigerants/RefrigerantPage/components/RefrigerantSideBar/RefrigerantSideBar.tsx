import { Dispatch, SetStateAction, useEffect, useState } from "react";
import SideBarButton from "../../../../../components/ui/Buttons/SideBarButton/SideBarButton"
import SideBarModule from "../../../../../components/ui/Containers/SideBarModule/SideBarModule"
import { EquipmentCollectionResponse } from "../../../../../types/equipment.types";
import { GasBottleCollectionResponse } from "../../../../../types/gasBottle.types";
import getAPI from "../../../../../utils/getAPI";
import RefrigerantDeactivate from "./components/RefrigerantDeactivate/RefrigerantDeactivate"
import AssociatedDataRefrigerant from "./components/AssociatedDataRefrigerant/AssociatedDataRefrigerant";
import RefrigerantSideBarSkeleton from "./components/RefrigerantSideBarSkeleton";
import { RefrigerantMovementCollectionResponse } from "../../../../../types/refrigerantMovement.types";
import RefrigerantHistory from "./components/RefrigerantHistory/RefrigerantHistory";
import { RefrigerantResponseData } from "../../../../../types/refrigerant.types";
import { RefrigerantActivityCollectionResponse } from "../../../../../types/refrigerantActivity.types";
import RefrigerantActions from "./components/RefrigerantActions";
import { ProductResponseData } from "../../../../../types/products.types";
import ExportResource from "../../../../CustomerAdmin/Contacts/ContactPage/components/ContactSideBar/components/ContactDeactivate/ExportResource";
import PermsProtectedComponent from "../../../../../components/PermsProtectedComponent";

const RefrigerantSideBar = (props: {
    refrigerant: RefrigerantResponseData | undefined,
    product: ProductResponseData | undefined,
    setRefrigerantData: Dispatch<SetStateAction<RefrigerantResponseData | undefined>>,
    isActive: boolean | undefined,
    isEditMode: boolean,
    setIsEditMode: Dispatch<SetStateAction<boolean>>
}) => {
    // Data States
    const [isEquipmentLoading, setIsEquipmentLoading] = useState(true);
    const [equipmentData, setEquipmentData] = useState<EquipmentCollectionResponse>();
    const [isGasBottlesLoading, setIsGasBottlesLoading] = useState(true);
    const [gasBottleData, setGasBottleData] = useState<GasBottleCollectionResponse>();
    const [isRefrigerantMovementsLoading, setIsRefrigerantMovementsLoading] = useState(true);
    const [refrigerantMovementData, setRefrigerantMovementData] = useState<RefrigerantMovementCollectionResponse>();
    const [isActivityLoading, setIsActivityLoading] = useState(true);
    const [activityData, setActivityData] = useState<RefrigerantActivityCollectionResponse>();

    useEffect(() => {
        if (props.refrigerant?.id === undefined) return;
        getEquipment(props.refrigerant.id);
        getGasBottles(props.refrigerant.id);
        getRefrigerantMovements(props.refrigerant.id);
    }, [props.refrigerant?.id]);
    
    useEffect(() => {
        if (props.refrigerant?.id === undefined) return;
        getActivity(props.refrigerant?.id);
    }, [JSON.stringify(props.refrigerant)]);

    const getEquipment = (refrigerantID: number) => {
        getAPI(`equipment`, {
            refrigerant_id: refrigerantID,
            is_active: true,
            perPage: 1
        }, (response: any) => {
            const equipmentData: EquipmentCollectionResponse = response.data;
            setEquipmentData(equipmentData);
        }, setIsEquipmentLoading)    
    } 

    const getGasBottles = (refrigerantID: number) => {
        getAPI(`gas_bottles`, {
            refrigerant_id: refrigerantID,
            is_returned: false,
            is_active: true,
            perPage: 1
        }, (response: any) => {
            const gasBottleData: GasBottleCollectionResponse = response.data;
            setGasBottleData(gasBottleData);
        }, setIsGasBottlesLoading)    
    } 

    const getRefrigerantMovements = (refrigerantID: number) => {
        getAPI(`refrigerant_movements`, {
            refrigerant_id: refrigerantID,
            perPage: 1
        }, (response: any) => {
            const refrigerantMovementData: RefrigerantMovementCollectionResponse = response.data;
            setRefrigerantMovementData(refrigerantMovementData);
        }, setIsRefrigerantMovementsLoading)    
    } 

    const getActivity = (refrigerantID: number) => {
        getAPI(`refrigerant_activity`, {
            refrigerant_id: refrigerantID,
            perPage: 1
        }, (response: any) => {
            const costCentreActivityData: RefrigerantActivityCollectionResponse = response.data;
            setActivityData(costCentreActivityData);
        }, setIsActivityLoading)    
    } 

    const isLoading = (
        isEquipmentLoading ||
        isGasBottlesLoading || 
        isRefrigerantMovementsLoading || 
        isActivityLoading
    )

    return (
        !isLoading && props.refrigerant && equipmentData && gasBottleData && refrigerantMovementData && activityData ? 
            !props.isEditMode ? <>
                {props.isActive ?
                    <PermsProtectedComponent requiredPerms={{ system: 2 }}>
                        <RefrigerantActions
                            refrigerantID={props.refrigerant.id}
                            product={props.product}
                            setIsEditMode={props.setIsEditMode}
                            setRefrigerantData={props.setRefrigerantData} 
                        />
                    </PermsProtectedComponent>
                : null}
                <AssociatedDataRefrigerant
                    refrigerantID={props.refrigerant.id}
                    equipmentCount={equipmentData.total_count}
                    gasBottleCount={gasBottleData.total_count}
                    activityCount={activityData.total_count}
                />
                {!props.refrigerant.data.is_consumable ?
                    <RefrigerantHistory
                        refrigerantID={props.refrigerant.id} 
                        refrigerantMovementCount={refrigerantMovementData.total_count}            
                    /> :
                    null
                }
                <PermsProtectedComponent requiredPerms={{ system: 2 }}>
                    <RefrigerantDeactivate 
                        refrigerantID={props.refrigerant.id} 
                        setRefrigerantData={props.setRefrigerantData} 
                        reactivate={!props.isActive} 
                    />
                </PermsProtectedComponent>

                <ExportResource
                    resourceData={props.refrigerant}
                    resourceName='Refrigerant'
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
        <RefrigerantSideBarSkeleton/>
    )
}

export default RefrigerantSideBar