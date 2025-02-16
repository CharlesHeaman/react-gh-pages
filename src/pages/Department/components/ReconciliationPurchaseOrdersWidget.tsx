import { useEffect, useState } from "react";
import DashboardWidget from "../../../components/ui/DashboardWidget/DashboardWidget";
import getAPI from "../../../utils/getAPI";
import { PurchaseOrderCollectionResponse } from "../../../types/purchaseOrder.types";

const ReconciliationPurchaseOrderWidget = () => {
    // Data States
    const [isPurchaseOrdersLoading, setIsPurchaseOrdersLoading] = useState(false);
    const [purchaseOrderData, setPurchaseOrdersData] = useState<PurchaseOrderCollectionResponse>();

    useEffect(() => {
        getEngineers();
    }, []);

    const getEngineers = () => {
        getAPI('purchase_orders', {
            is_accounts_outstanding: 1,
            is_active: true,
            perPage: 1
        }, (response: any) => {
            const purchaseOrderData: PurchaseOrderCollectionResponse = response.data;
            setPurchaseOrdersData(purchaseOrderData);
        }, setIsPurchaseOrdersLoading);
    }

    return (
        <DashboardWidget 
            title="Purchase Orders"
            count={purchaseOrderData?.total_count}
            text="Requiring accounts reconciliation." 
            iconFont={"balance"}
            to={"../purchase_orders"}
        />
    )
}

export default ReconciliationPurchaseOrderWidget;