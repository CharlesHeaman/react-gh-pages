import { Dispatch, SetStateAction, useEffect, useState } from "react"
import PermsProtectedComponent from "../../../../components/PermsProtectedComponent"
import SideBarButton from "../../../../components/ui/Buttons/SideBarButton/SideBarButton"
import SideBarModule from "../../../../components/ui/Containers/SideBarModule/SideBarModule"
import { PurchaseOrderCollectionResponse } from "../../../../types/purchaseOrder.types"
import { RequisitionCollectionResponse } from "../../../../types/requisition.types"
import { VehicleActivityCollectionResponse } from "../../../../types/vehicleActivity.types"
import { VehicleResponseData } from "../../../../types/vehicles.types"
import getAPI from "../../../../utils/getAPI"
import ExportResource from "../../../CustomerAdmin/Contacts/ContactPage/components/ContactSideBar/components/ContactDeactivate/ExportResource"
import VehicleAssignment from "./components/VehicleAssignment/VehicleAssignment"
import VehicleAssociatedResources from "./components/VehicleAssociatedResources/VehicleAssociatedResource"
import VehicleDeactivate from "./components/VehicleDeactivate/VehicleDeactivate"
import VehicleMOTTax from "./components/VehicleMOTTax/VehicleMOTTax"
import VehicleSideBarSkeleton from "./components/VehicleSideBarSkeleton"
import VehicleUploads from "./components/VehicleUploads/VehicleUploads"

const VehicleSideBar = (props: {
    vehicle: VehicleResponseData | undefined,
    setVehicleData: Dispatch<SetStateAction<VehicleResponseData | undefined>>,
    isEditMode: boolean,
    setIsEditMode: Dispatch<SetStateAction<boolean>>,
}) => {

    // Data States
    const [isRequisitionsLoading, setIsRequisitionsLoading] = useState(true);
    const [requisitionData, setRequisitionData] = useState<RequisitionCollectionResponse>();
    const [isPurchaseOrdersLoading, setIsPurchaseOrdersLoading] = useState(true);
    const [purchaseOrderData, setPurchaseOrderData] = useState<PurchaseOrderCollectionResponse>();
    const [isActivityLoading, setIsActivityLoading] = useState(true);
    const [activityData, setActivityData] = useState<VehicleActivityCollectionResponse>();

    useEffect(() => {
        if (props.vehicle?.id === undefined) return;
        getRequisitions(props.vehicle.id);
        getPurchaseOrders(props.vehicle.id);
    }, [props.vehicle?.id]);
    

    useEffect(() => {
        if (props.vehicle?.id === undefined) return;
        getActivity(props.vehicle.id);
    }, [JSON.stringify(props.vehicle)]);

    const getRequisitions = (vehicleID: number) => {
        getAPI(`requisitions`, {
            vehicle_id: vehicleID,
            perPage: 1
        }, (response: any) => {
            const requisitionData: RequisitionCollectionResponse = response.data;
            setRequisitionData(requisitionData);
        }, setIsRequisitionsLoading)    
    } 

    const getPurchaseOrders = (vehicleID: number) => {
        getAPI(`purchase_orders`, {
            vehicle_id: vehicleID,
            perPage: 1
        }, (response: any) => {
            const purchaseOrderData: PurchaseOrderCollectionResponse = response.data;
            setPurchaseOrderData(purchaseOrderData);
        }, setIsPurchaseOrdersLoading)    
    } 

    const getActivity = (vehicleID: number) => {
        getAPI(`vehicle_activity`, {
            vehicle_id: vehicleID,
            perPage: 1
        }, (response: any) => {
            const vehicleActivityData: VehicleActivityCollectionResponse = response.data;
            setActivityData(vehicleActivityData);
        }, setIsActivityLoading)    
    } 

    const isLoading = (
        isRequisitionsLoading ||
        isPurchaseOrdersLoading || 
        isActivityLoading
    )
    
    return (
        !isLoading && props.vehicle && purchaseOrderData && requisitionData && activityData ? 
            !props.isEditMode ? <>
                {props.vehicle.data.is_active ? 
                    <>
                        <PermsProtectedComponent requiredPerms={{ engineer_assets: 2 }}>
                            <SideBarModule title="Actions">
                                <SideBarButton 
                                    text='Edit Vehicle' 
                                    iconFont="edit" 
                                    color="orange" 
                                    clickEvent={() => props.setIsEditMode(true)}
                                />
                            </SideBarModule>
                            <VehicleAssignment
                                vehicleID={props.vehicle.id}
                                userID={props.vehicle.data.user_id}
                                setVehicleData={props.setVehicleData}
                            />
                            <VehicleMOTTax
                                vehicleID={props.vehicle.id}
                                setVehicleData={props.setVehicleData}
                            />
                        </PermsProtectedComponent>

                        {/* <SideBarModule title="NavMan">
                            <SideBarButton text='Link to NavMan' iconFont="link" clickEvent={() => null}/>
                            <SideBarButton text='Vehicle History ()' iconFont="history" clickEvent={() => null}/>
                        </SideBarModule> */}
                    </> : null
                }
                <VehicleAssociatedResources
                    vehicleID={props.vehicle.id} 
                    purchaseOrderCount={purchaseOrderData.total_count}
                    requisitionCount={requisitionData.total_count}
                    activityCount={activityData.total_count}
                />
                <PermsProtectedComponent requiredPerms={{ engineer_assets: 2 }}>
                    <VehicleDeactivate 
                        vehicleID={props.vehicle.id} 
                        isAssigned={props.vehicle.data.user_id !== null}
                        reactivate={!props.vehicle.data.is_active}
                        setVehicleData={props.setVehicleData}
                    />
                </PermsProtectedComponent>

                <ExportResource
                    resourceName="Vehicle"
                    resourceData={props.vehicle}
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
        <VehicleSideBarSkeleton/>
    )
}

export default VehicleSideBar