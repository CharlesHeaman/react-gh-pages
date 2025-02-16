import { useState } from "react";
import SideBarButton from "../../../../../../components/ui/Buttons/SideBarButton/SideBarButton"
import SideBarModule from "../../../../../../components/ui/Containers/SideBarModule/SideBarModule"
import VehicleHistory from "./components/VehicleHistory";
import VehiclePurchaseOrders from "./components/VehiclePurchaseOrderList";
import VehicleRequisitions from "./components/VehicleRequisitions";

const VehicleAssociatedResources = (props: {
    vehicleID: number,
    purchaseOrderCount: number,
    requisitionCount: number,
    activityCount: number,
}) => {
    const [showPurchaseOrders, setShowPurchaseOrders] = useState(false);
    const [showRequisitions, setShowRequisitions] = useState(false);
    const [showHistory, setShowHistory] = useState(false);

    return (
        <> 
            <SideBarModule title="Vehicle">
                <SideBarButton
                    text={`Purchase Orders (${props.purchaseOrderCount})`}
                    iconFont="receipt_long"
                    clickEvent={() => setShowPurchaseOrders(true)}
                />
                <SideBarButton
                    text={`Requisitions (${props.requisitionCount})`}
                    iconFont="all_inbox"
                    clickEvent={() => setShowRequisitions(true)}
                />
                <SideBarButton
                    text={`History (${props.activityCount})`}
                    iconFont="history"
                    clickEvent={() => setShowHistory(true)}
                />
            </SideBarModule>

            <VehiclePurchaseOrders
                vehicleID={props.vehicleID}
                totalCount={props.purchaseOrderCount}
                show={showPurchaseOrders}
                hideFunc={() => setShowPurchaseOrders(false)}
            />

            <VehicleRequisitions
                vehicleID={props.vehicleID}
                totalCount={props.requisitionCount}
                show={showRequisitions}
                hideFunc={() => setShowRequisitions(false)}
            />

            <VehicleHistory
                vehicleID={props.vehicleID}
                totalCount={props.activityCount}
                show={showHistory}
                hideFunc={() => setShowHistory(false)}
            />
        </>
    )
}

export default VehicleAssociatedResources