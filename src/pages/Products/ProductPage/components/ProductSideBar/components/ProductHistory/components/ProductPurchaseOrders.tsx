import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import WindowOverlay from "../../../../../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import { PurchaseOrderCollectionResponse } from "../../../../../../../../types/purchaseOrder.types";
import getAPI from "../../../../../../../../utils/getAPI";
import PurchaseOrderList from "../../../../../../../PurchaseOrders/components/PurchaseOrderList";
import PurchaseOrderSearchHeader from "../../../../../../../PurchaseOrders/components/PurchaseOrderSearchHeader";
import getPurchaseOrderSearchParams from "../../../../../../../PurchaseOrders/utils/getPurchaseOrderSearchParam";

const ProductPurchaseOrders = (props: {
    productID: number,
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
    }, [props.productID, JSON.stringify(purchaseOrderSearchParams)])


    const searchPurchaseOrders = () => {
        getAPI('purchase_orders', {
            product_id: props.productID,
            ...purchaseOrderSearchParams
        }, (response: any) => {
            const purchaseOrderData: PurchaseOrderCollectionResponse = response.data;
            setPurchaseOrderData(purchaseOrderData);
        }, setIsPurchaseOrdersLoading)
    }

    return (
        <WindowOverlay 
            title={"Product Purchase Orders"} 
            maxWidth={1800} 
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
                hasSearched
            />
        </WindowOverlay>
    )
}

export default ProductPurchaseOrders