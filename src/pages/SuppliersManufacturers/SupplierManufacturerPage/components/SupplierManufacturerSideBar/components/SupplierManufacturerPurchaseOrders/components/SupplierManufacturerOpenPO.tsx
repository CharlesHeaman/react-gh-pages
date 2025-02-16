import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import WindowOverlay from "../../../../../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import { PurchaseOrderCollectionResponse } from "../../../../../../../../types/purchaseOrder.types";
import getAPI from "../../../../../../../../utils/getAPI";
import PurchaseOrderList from "../../../../../../../PurchaseOrders/components/PurchaseOrderList";
import PurchaseOrderSearchHeader from "../../../../../../../PurchaseOrders/components/PurchaseOrderSearchHeader";
import getPurchaseOrderSearchParams from "../../../../../../../PurchaseOrders/utils/getPurchaseOrderSearchParam";

const SupplierManufacturerOpenPurchaseOrders = (props: {
    supplierID: number,
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
        getPurchaseOrders();
    }, [props.supplierID, JSON.stringify(purchaseOrderSearchParams)])

    const getPurchaseOrders = () => {
        getAPI(`purchase_orders`, {
            supplier_id: props.supplierID,
            ...purchaseOrderSearchParams
        }, (response: any) => {
            const purchaseOrderData: PurchaseOrderCollectionResponse = response.data;
            setPurchaseOrderData(purchaseOrderData);
        }, setIsPurchaseOrdersLoading)    
    } 

    return (
        <WindowOverlay 
            title={"Open Purchase Orders"} 
            maxWidth={1300} 
            show={props.show}
            hideFunc={props.hideFunc} 
            top
        >
            <PurchaseOrderSearchHeader
                supplierManufacturerID={props.supplierID}
            />
            <PurchaseOrderList 
                isPurchaseOrdersLoading={isPurchaseOrdersLoading} 
                purchaseOrders={purchaseOrderData} 
                perPage={purchaseOrderSearchParams.perPage} 
                totalCount={props.totalCount}            
                hideSupplier
                hasSearched
            />
        </WindowOverlay>
    )
}

export default SupplierManufacturerOpenPurchaseOrders