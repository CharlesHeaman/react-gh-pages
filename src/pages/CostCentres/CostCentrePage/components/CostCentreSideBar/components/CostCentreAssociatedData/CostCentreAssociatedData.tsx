import { useState } from "react";
import SideBarButton from "../../../../../../../components/ui/Buttons/SideBarButton/SideBarButton";
import SideBarModule from "../../../../../../../components/ui/Containers/SideBarModule/SideBarModule";
import CostCentreHistory from "./components/CostCentreHistory";
import CostCentrePurchaseOrders from "./components/CostCentrePurchaseOrders";
import CostCentreRequisitions from "./components/CostCentreRequisitions";
import CostCentreVehicles from "./components/CostCentreVehicles";

const CostCentreAssociatedData = (props: {
    costCentreID: number,
    vehicleCount: number,
    requisitionCount: number,
    purchaseOrderCount: number,
    activityCount: number,
    showVehicles: boolean,
}) => {
    const [showVehicles, setShowVehicles] = useState(false);
    const [showRequisitions, setShowRequisitions] = useState(false);
    const [showPurchaseOrders, setShowPurchaseOrders] = useState(false);
    const [showHistory, setShowHistory] = useState(false);

    return (
        <>
            <SideBarModule title='Cost Centre'>
                {props.showVehicles ? <SideBarButton 
                    text={`Vehicles (${props.vehicleCount})`}
                    iconFont='directions_car'
                    clickEvent={() => setShowVehicles(true)}
                /> : null}
                <SideBarButton 
                    text={`Purchase Orders (${props.purchaseOrderCount})`}
                    iconFont='receipt_long'
                    clickEvent={() => setShowPurchaseOrders(true)}
                />
                <SideBarButton 
                    text={`Requisitions (${props.requisitionCount})`}
                    iconFont='all_inbox'
                    clickEvent={() => setShowRequisitions(true)}
                />
                <SideBarButton
                    text={`History (${props.activityCount})`}
                    iconFont="history"
                    clickEvent={() => setShowHistory(true)}
                />
            </SideBarModule>

            {props.showVehicles ? <CostCentreVehicles
                costCentreID={props.costCentreID}
                totalCount={props.vehicleCount}
                show={showVehicles}
                hideFunc={() => setShowVehicles(false)}
            /> : null}

            <CostCentreRequisitions
                costCentreID={props.costCentreID}
                totalCount={props.vehicleCount}
                show={showRequisitions}
                hideFunc={() => setShowRequisitions(false)}
            />

            <CostCentrePurchaseOrders
                costCentreID={props.costCentreID}
                totalCount={props.vehicleCount}
                show={showPurchaseOrders}
                hideFunc={() => setShowPurchaseOrders(false)}
            />

            <CostCentreHistory
                costCentreID={props.costCentreID}
                totalCount={props.activityCount}
                show={showHistory}
                hideFunc={() => setShowHistory(false)}
            />
        </>
    )
}

export default CostCentreAssociatedData