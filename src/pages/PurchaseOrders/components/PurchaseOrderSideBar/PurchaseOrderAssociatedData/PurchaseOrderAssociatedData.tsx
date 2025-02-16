import { useState } from "react";
import SideBarButton from "../../../../../components/ui/Buttons/SideBarButton/SideBarButton";
import SideBarModule from "../../../../../components/ui/Containers/SideBarModule/SideBarModule";
import PurchaseOrderHistory from "./PurchaseOrderHistory";

const PurchaseOrderAssociatedData = (props: {
    purchaseOrderID: number,
    activityCount: number,
}) => {
    const [showHistory, setShowHistory] = useState(false);

    return (
        <>
            <SideBarModule title="Purchase Order">
                <SideBarButton
                    text={`History (${props.activityCount})`}
                    iconFont="history"
                    clickEvent={() => setShowHistory(true)}
                />
            </SideBarModule>

            <PurchaseOrderHistory 
                purchaseOrderID={props.purchaseOrderID}
                totalCount={props.activityCount}
                show={showHistory} 
                hideFunc={() => setShowHistory(false)}
            /> 
        </>
    )
}

export default PurchaseOrderAssociatedData