import { Dispatch, SetStateAction, useEffect, useState } from "react"
import SideBarButton from "../../../components/ui/Buttons/SideBarButton/SideBarButton"
import SideBarModule from "../../../components/ui/Containers/SideBarModule/SideBarModule"
import PurchaseOrderAttachments from "./PurchaseOrderSideBar/PurchaseOrderAttachments/PurchaseOrderAttachments"
import { PurchaseOrderResponseData } from "../../../types/purchaseOrder.types"
import PurchaseOrderSideBarSkeleton from "./PurchaseOrderSideBar/PurchaseOrderSideBarSkeleton"
import PurchaseOrderActions from "./PurchaseOrderSideBar/PurchaseOrderActions/PurchaseOrderActions"
import { PurchaseOrderAttachmentResponseData } from "../../../types/purchaseOrderAttachments.types"
import { SupplierManufacturerResponseData } from "../../../types/supplierManufacturer.types"
import { PurchaseOrderLineCollectionResponse } from "../../../types/PurchaseOrderLines.types"
import { CostCentreResponseData } from "../../../types/costCentres.types"
import { CustomerResponseData } from "../../../types/customers.types"
import { UserResponseData } from "../../../types/user.types"
import { VehicleResponseData } from "../../../types/vehicles.types"
import PurchaseOrderAssociatedData from "./PurchaseOrderSideBar/PurchaseOrderAssociatedData/PurchaseOrderAssociatedData"
import { PurchaseOrderActivityCollectionResponse } from "../../../types/purchaseOrderActivity.types"
import getAPI from "../../../utils/getAPI"
import ExportResource from "../../CustomerAdmin/Contacts/ContactPage/components/ContactSideBar/components/ContactDeactivate/ExportResource"
import PermsProtectedComponent from "../../../components/PermsProtectedComponent"
import PurchaseOrderAccounts from "./PurchaseOrderSideBar/PurchaseOrderActions/PurchaseOrderAccounts"

const PurchaseOrderSideBar = (props: {
    purchaseOrder: PurchaseOrderResponseData | undefined,
    purchaseOrderLines: PurchaseOrderLineCollectionResponse | undefined,
    costCentre: CostCentreResponseData | undefined,
    customerData: CustomerResponseData | undefined,
    userData: UserResponseData | undefined,
    vehicleData: VehicleResponseData | undefined,
    supplier: SupplierManufacturerResponseData | undefined,
    attachments: Array<PurchaseOrderAttachmentResponseData>,
    getAttachments: (purchaseOrderID: number) => void,
    isEditMode: boolean,
    setIsEditMode: Dispatch<SetStateAction<boolean>>,
    setPurchaseOrderData: Dispatch<SetStateAction<PurchaseOrderResponseData | undefined>>,
    setPurchaseOrderLines: Dispatch<SetStateAction<PurchaseOrderLineCollectionResponse | undefined>>,
    getPurchaseOrderData: () => void
}) => {

    // Data States
    const [isActivityLoading, setIsActivityLoading] = useState(true);
    const [activityData, setActivityData] = useState<PurchaseOrderActivityCollectionResponse>();
    
    useEffect(() => {
        if (props.purchaseOrder?.id === undefined) return;
        getActivity(props.purchaseOrder.id);
    }, [JSON.stringify(props.purchaseOrder), JSON.stringify(props.purchaseOrderLines), JSON.stringify(props.attachments)]);

    const getActivity = (purchaseOrderID: number) => {
        getAPI(`purchase_order_activity`, {
            purchase_order_id: purchaseOrderID,
            perPage: 1
        }, (response: any) => {
            const purchaseOrderActivityData: PurchaseOrderActivityCollectionResponse = response.data;
            setActivityData(purchaseOrderActivityData);
        }, setIsActivityLoading)    
    } 

    const isLoading = (
        isActivityLoading 
    )

    const isSent = props.purchaseOrder?.data.sent_by_id !== null; 
    
    return (
        !isLoading && props.purchaseOrder && props.supplier && props.purchaseOrderLines && props.costCentre && activityData ?
            !props.isEditMode ? 
                <>
                    <PermsProtectedComponent requiredPerms={{ stock: 2 }}>
                        <PurchaseOrderActions
                            purchaseOrderID={props.purchaseOrder.id}
                            purchaseOrderLines={props.purchaseOrderLines}
                            costCentre={props.costCentre}
                            vehicleData={props.vehicleData}
                            customerData={props.customerData}
                            userData={props.userData}
                            isSent={isSent}
                            isOutstanding={props.purchaseOrder.data.is_outstanding}
                            supplier={props.supplier}
                            setPurchaseOrderData={props.setPurchaseOrderData}
                            setPurchaseOrderLines={props.setPurchaseOrderLines}
                            setIsEditMode={props.setIsEditMode}
                            attachments={props.attachments}
                            getPurchaseOrderData={props.getPurchaseOrderData}
                        />
                    </PermsProtectedComponent>
                    <PermsProtectedComponent requiredPerms={{ accounts: 2 }}>
                        <PurchaseOrderAccounts
                            isSent={isSent}
                            isAccountsOutstanding={props.purchaseOrder.data.is_accounts_outstanding}
                        />
                    </PermsProtectedComponent>
                    <PermsProtectedComponent requiredPerms={{ stock: 2 }}>
                        {!isSent && <PurchaseOrderAttachments
                            purchaseOrderID={props.purchaseOrder.id}
                            getAttachments={props.getAttachments}
                        />}
                    </PermsProtectedComponent>

                    <PurchaseOrderAssociatedData
                        purchaseOrderID={props.purchaseOrder.id}
                        activityCount={activityData.total_count}
                    />
                    {/* <SideBarModule title="Abandon">
                        <SideBarButton
                            text='Abandon Purchase Order' 
                            color="red" iconFont="delete" clickEvent={() => null}/>
                    </SideBarModule> */}
                    <ExportResource
                        resourceName="Purchase Order"
                        resourceData={props.purchaseOrder}
                    />
                </> : 
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
        <PurchaseOrderSideBarSkeleton/>    
    )
}

export default PurchaseOrderSideBar