import { useState } from "react";
import SideBarButton from "../../../../../../components/ui/Buttons/SideBarButton/SideBarButton";
import SideBarModule from "../../../../../../components/ui/Containers/SideBarModule/SideBarModule";
import JobRequisitionedItemsList from "./components/JobRequisitionedItemsList";
import JobPurchaseOrdersList from "./components/JobPurchaseOrderList";

const JobMaterials = (props: {
    jobID: number,
    jobNumber: number,
    departmentID: number,
    requisitionLineCount: number,
    purchaseOrderCount: number,
    tickets: Array<any>
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

            <JobRequisitionedItemsList 
                jobID={props.jobID}
                jobNumber={props.jobNumber} 
                departmentID={props.departmentID}
                tickets={props.tickets}
                totalCount={props.requisitionLineCount}
                show={showProducts} 
                hideFunc={() => setShowProducts(false)}
            />

            <JobPurchaseOrdersList 
                jobID={props.jobID}
                jobNumber={props.jobNumber} 
                departmentID={props.departmentID}
                totalCount={props.purchaseOrderCount}
                show={showPurchaseOrders} 
                hideFunc={() => setShowPurchaseOrders(false)}
            />
        </>
    )
}

export default JobMaterials  