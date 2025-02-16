import { useState } from "react";
import SideBarButton from "../../../../../../../components/ui/Buttons/SideBarButton/SideBarButton";
import SideBarModule from "../../../../../../../components/ui/Containers/SideBarModule/SideBarModule";
import TicketRequisitionedItemsList from "./components/TicketRequisitionedItemsList";
import TicketPurchaseOrdersList from "./components/TicketPurchaseOrderList";

const TicketMaterials = (props: {
    ticketID: number,
    ticketType: number,
    ticketNumber: number,
    departmentID: number,
    requisitionLineCount: number,
    purchaseOrderCount: number,
}) => {
    const [showProducts, setShowProducts] = useState(false);
    const [showPurchaseOrders, setShowPurchaseOrders] = useState(false);

    return (
        <>
            <SideBarModule title="Materials">
                <SideBarButton
                    text={`Purchase Orders (${props.purchaseOrderCount})`}
                    iconFont="receipt_long"
                    clickEvent={() => setShowPurchaseOrders(true)}
                />
                <SideBarButton
                    text={`Requisitioned Items (${props.requisitionLineCount})`}
                    iconFont="inventory"
                    clickEvent={() => setShowProducts(true)}
                />
            </SideBarModule>

            <TicketRequisitionedItemsList 
                ticketID={props.ticketID}
                ticketType={props.ticketType}            
                ticketNumber={props.ticketNumber} 
                departmentID={props.departmentID}
                totalCount={props.requisitionLineCount}
                show={showProducts} 
                hideFunc={() => setShowProducts(false)}
            />

            <TicketPurchaseOrdersList 
                ticketID={props.ticketID}
                ticketType={props.ticketType}
                ticketNumber={props.ticketNumber} 
                departmentID={props.departmentID}
                totalCount={props.purchaseOrderCount}
                show={showPurchaseOrders} 
                hideFunc={() => setShowPurchaseOrders(false)}
            />
        </>
    )
}

export default TicketMaterials  