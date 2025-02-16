import { useState } from "react";
import SideBarButton from "../../../../../../../components/ui/Buttons/SideBarButton/SideBarButton"
import SideBarModule from "../../../../../../../components/ui/Containers/SideBarModule/SideBarModule"
import SupplierManufacturerOpenPurchaseOrders from "./components/SupplierManufacturerOpenPO"

const SupplierManufacturerPurchaseOrders = (props: {
    supplierID: number,
    purchaseOrderCount: number,
}) => {
    const [showPurchaseOrders, setShowPurchaseOrders] = useState(false);
    return (
        <>
            <SideBarModule title="Purchase Orders">
                <SideBarButton
                    text={`Open Purchase Orders (${props.purchaseOrderCount})`}
                    iconFont="receipt_long"
                    color="no-color"
                    clickEvent={() => setShowPurchaseOrders(true)}
                />
            </SideBarModule>

            <SupplierManufacturerOpenPurchaseOrders
                supplierID={props.supplierID}
                totalCount={props.purchaseOrderCount}
                show={showPurchaseOrders}
                hideFunc={() => setShowPurchaseOrders(false)}
            />
        </>
    )
}

export default SupplierManufacturerPurchaseOrders