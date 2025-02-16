import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import WindowOverlay from "../../../../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import { PurchaseOrderCollectionResponse } from "../../../../../../../types/purchaseOrder.types";
import getAPI from "../../../../../../../utils/getAPI";
import PurchaseOrderList from "../../../../../../PurchaseOrders/components/PurchaseOrderList";
import PurchaseOrderSearchHeader from "../../../../../../PurchaseOrders/components/PurchaseOrderSearchHeader";
import getPurchaseOrderSearchParams from "../../../../../../PurchaseOrders/utils/getPurchaseOrderSearchParam";


const VehiclePurchaseOrders = (props: {
    vehicleID: number,
    totalCount: number,
    show: boolean,
    hideFunc: () => void,
}) => {
    const [searchParams] = useSearchParams();

    // Data States
    const [isPurchaseOrdersLoading, setIsPurchaseOrdersLoading] = useState(true);
    const [purchaseOrderData, setPurchaseOrderData] = useState<PurchaseOrderCollectionResponse>();

    // Search Parameters
    const purchaseOrderSearchParams = getPurchaseOrderSearchParams(searchParams);

    useEffect(() => {
        searchPurchaseOrders();
    }, [JSON.stringify(purchaseOrderSearchParams), props.vehicleID])


    const searchPurchaseOrders = () => {
        getAPI('purchase_orders', {
            ...purchaseOrderSearchParams,
            vehicle_id: props.vehicleID,
        }, (response: any) => {
            const purchaseOrderData: PurchaseOrderCollectionResponse = response.data;
            setPurchaseOrderData(purchaseOrderData);
        }, setIsPurchaseOrdersLoading)
    }
    
    return (
        <WindowOverlay 
            title={"Vehicle Purchase Orders"} 
            maxWidth={1600} 
            show={props.show}
            hideFunc={props.hideFunc} 
            top
        >
            <PurchaseOrderSearchHeader
                vehicleID={props.vehicleID}
                startAll
            />
            <PurchaseOrderList 
                isPurchaseOrdersLoading={isPurchaseOrdersLoading} 
                purchaseOrders={purchaseOrderData} 
                perPage={purchaseOrderSearchParams.perPage}
                totalCount={props.totalCount}
                hasSearched
            />
        </WindowOverlay>
    )
}

export default VehiclePurchaseOrders