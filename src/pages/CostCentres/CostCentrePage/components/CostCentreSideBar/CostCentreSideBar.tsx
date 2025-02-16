import { Dispatch, SetStateAction, useEffect, useState } from "react";
import SideBarButton from "../../../../../components/ui/Buttons/SideBarButton/SideBarButton";
import SideBarModule from "../../../../../components/ui/Containers/SideBarModule/SideBarModule";
import { CostCentreActivityCollectionResponse } from "../../../../../types/costCentreActivity.types";
import { CostCentreResponseData } from "../../../../../types/costCentres.types";
import { PurchaseOrderCollectionResponse } from "../../../../../types/purchaseOrder.types";
import { RequisitionCollectionResponse } from "../../../../../types/requisition.types";
import { VehicleCollectionResponse } from "../../../../../types/vehicles.types";
import getAPI from "../../../../../utils/getAPI";
import CostCentreAssociatedData from "./components/CostCentreAssociatedData/CostCentreAssociatedData";
import CostCentreDeactivate from "./components/CostCentreDeactivate";
import CostCentreSideBarSkeleton from "./components/CostCentreSideBarSkeleton";
import ExportResource from "../../../../CustomerAdmin/Contacts/ContactPage/components/ContactSideBar/components/ContactDeactivate/ExportResource";
import PermsProtectedComponent from "../../../../../components/PermsProtectedComponent";

const CostCentreSideBar = (props: {
    costCentre: CostCentreResponseData | undefined,
    setCostCentreData: Dispatch<SetStateAction<CostCentreResponseData | undefined>>,
    isEditMode: boolean,
    setIsEditMode: Dispatch<SetStateAction<boolean>>,
    showVehicles: boolean
}) => {

    const [isVehiclesLoading, setIsVehiclesLoading] = useState(true);
    const [vehiclesData, setVehiclesData] = useState<VehicleCollectionResponse>();
    const [isRequisitionsLoading, setIsRequisitionsLoading] = useState(false);
    const [requisitionData, setRequisitionData] = useState<RequisitionCollectionResponse>();
    const [isPurchaseOrdersLoading, setIsPurchaseOrdersLoading] = useState(true);
    const [purchaseOrderData, setPurchaseOrderData] = useState<PurchaseOrderCollectionResponse>();
    const [isActivityLoading, setIsActivityLoading] = useState(true);
    const [activityData, setActivityData] = useState<CostCentreActivityCollectionResponse>();

    useEffect(() => {
        if (props.costCentre?.id === undefined) return;
        getVehicles(props.costCentre.id);
        getRequisitions(props.costCentre.id);
        getPurchaseOrders(props.costCentre.id);
    }, [props.costCentre?.id]);

    useEffect(() => {
        if (props.costCentre?.id === undefined) return;
        getActivity(props.costCentre.id);
    }, [JSON.stringify(props.costCentre)]);

    const getVehicles = (costCentreID: number) => {
        getAPI(`vehicles`, {
            cost_centre_id: costCentreID,
            is_active: true,
            perPage: 1
        }, (response: any) => {
            const vehicleData: VehicleCollectionResponse = response.data;
            setVehiclesData(vehicleData);
        }, setIsVehiclesLoading);
    }

    const getRequisitions = (costCentreID: number) => {
        getAPI(`requisitions`, {
            cost_centre_id: costCentreID,
            perPage: 1
        }, (response: any) => {
            const requisitionData: RequisitionCollectionResponse = response.data;
            setRequisitionData(requisitionData);
        }, setIsRequisitionsLoading);
    }

    const getPurchaseOrders = (costCentreID: number) => {
        getAPI(`purchase_orders`, {
            cost_centre_id: costCentreID,
            perPage: 1
        }, (response: any) => {
            const purchaseOrderData: PurchaseOrderCollectionResponse = response.data;
            setPurchaseOrderData(purchaseOrderData);
        }, setIsPurchaseOrdersLoading);
    }

    const getActivity = (costCentreID: number) => {
        getAPI(`cost_centre_activity`, {
            cost_centre_id: costCentreID,
            perPage: 1
        }, (response: any) => {
            const costCentreActivityData: CostCentreActivityCollectionResponse = response.data;
            setActivityData(costCentreActivityData);
        }, setIsActivityLoading)    
    } 

    const isSideBarLoading = (
        isVehiclesLoading ||
        isRequisitionsLoading || 
        isPurchaseOrdersLoading ||
        isActivityLoading
    )

    return (
        !isSideBarLoading && props.costCentre && vehiclesData && requisitionData && purchaseOrderData && activityData ? 
            !props.isEditMode ?  <>
                {props.costCentre.data.is_active ?
                    <PermsProtectedComponent requiredPerms={{ system: 2 }}>
                        <SideBarModule title='Actions'>
                            <SideBarButton 
                                text='Edit Cost Centre'
                                color="orange"
                                iconFont='edit'
                                clickEvent={() => props.setIsEditMode(true)}
                            />
                        </SideBarModule>        
                    </PermsProtectedComponent>
                : null}
                <CostCentreAssociatedData
                    costCentreID={props.costCentre.id}
                    vehicleCount={vehiclesData.total_count}
                    requisitionCount={requisitionData.total_count}
                    purchaseOrderCount={purchaseOrderData.total_count}
                    activityCount={activityData.total_count}
                    showVehicles={props.showVehicles}
                />
                <PermsProtectedComponent requiredPerms={{ system: 2 }}>
                    <CostCentreDeactivate 
                        costCentreID={props.costCentre.id} 
                        setCostCentreData={props.setCostCentreData}
                        reactivate={!props.costCentre.data.is_active} 
                    /> 
                </PermsProtectedComponent>

                <ExportResource
                    resourceData={props.costCentre}
                    resourceName='Cost Centre'
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
        <CostCentreSideBarSkeleton/>
    )
}

export default CostCentreSideBar