import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import WindowOverlay from "../../../../../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import { PurchaseOrderCollectionResponse } from "../../../../../../../../types/purchaseOrder.types";
import getAPI from "../../../../../../../../utils/getAPI";
import PurchaseOrderList from "../../../../../../../PurchaseOrders/components/PurchaseOrderList";
import PurchaseOrderSearchHeader from "../../../../../../../PurchaseOrders/components/PurchaseOrderSearchHeader";
import getPurchaseOrderSearchParams from "../../../../../../../PurchaseOrders/utils/getPurchaseOrderSearchParam";

const CostCentrePurchaseOrders = (props: {
    costCentreID: number,
    totalCount: number,
    show: boolean,
    hideFunc: () => void,
}) => {
    const [searchParams] = useSearchParams();

    // Search States
    const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);

    // Data States
    const [isPurchaseOrdersLoading, setIsPurchaseOrdersLoading] = useState(true);
    const [purchaseOrderData, setPurchaseOrderData] = useState<PurchaseOrderCollectionResponse>();

    // Search Parameters
    const purchaseOrderSearchParams = getPurchaseOrderSearchParams(searchParams);

    useEffect(() => {
        searchPurchaseOrders();
    }, [JSON.stringify(purchaseOrderSearchParams), props.costCentreID])


    const searchPurchaseOrders = () => {
        getAPI('purchase_orders', {
            ...purchaseOrderSearchParams,
            cost_centre_id: props.costCentreID
        }, (response: any) => {
            const purchaseOrderData: PurchaseOrderCollectionResponse = response.data;
            setPurchaseOrderData(purchaseOrderData);
        }, setIsPurchaseOrdersLoading)
    }
    
    return (
        <WindowOverlay 
            title={"Cost Centre Purchase Orders"} 
            maxWidth={1600} 
            show={props.show}
            hideFunc={props.hideFunc} 
            top
        >
            <PurchaseOrderSearchHeader
                startAll
            />
            <PurchaseOrderList 
                isPurchaseOrdersLoading={isPurchaseOrdersLoading} 
                purchaseOrders={purchaseOrderData} 
                perPage={purchaseOrderSearchParams.perPage}
                totalCount={props.totalCount}
                hideType
                hasSearched
            />
        </WindowOverlay>
    )
}

export default CostCentrePurchaseOrders