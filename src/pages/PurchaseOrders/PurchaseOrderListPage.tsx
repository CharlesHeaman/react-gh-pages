import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import OuterContainer from "../../components/ui/Containers/OuterContainer/OuterContainer";
import { PurchaseOrderCollectionResponse } from "../../types/purchaseOrder.types";
import getAPI from "../../utils/getAPI";
import PurchaseOrderList from "./components/PurchaseOrderList";
import PurchaseOrderSearchHeader from "./components/PurchaseOrderSearchHeader";
import getPurchaseOrderSearchParams from "./utils/getPurchaseOrderSearchParam";
import PurchaseOrderAdvancedSearch from "./components/PurchaseOrderAdvancedSearch";

const PurchaseOrders = ()  => {
    const [searchParams] = useSearchParams();

    // Search States
    const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);

    // Data States
    const [isPurchaseOrdersLoading, setIsPurchaseOrdersLoading] = useState(true);
    const [purchaseOrderData, setPurchaseOrderData] = useState<PurchaseOrderCollectionResponse>();

    // Search Parameters
    const hasSearched = searchParams.get(`purchase_orders_has_searched`) === "true";
    const purchaseOrderSearchParams = getPurchaseOrderSearchParams(searchParams);

    useEffect(() => {
        hasSearched && searchPurchaseOrders();
    }, [JSON.stringify(purchaseOrderSearchParams)])


    const searchPurchaseOrders = () => {
        getAPI('purchase_orders', purchaseOrderSearchParams, (response: any) => {
            const purchaseOrderData: PurchaseOrderCollectionResponse = response.data;
            setPurchaseOrderData(purchaseOrderData);
        }, setIsPurchaseOrdersLoading)
    }
    
    return (
        <>
            <OuterContainer
                title='Purchase Orders'
                maxWidth={1800}
                description="Create, edit, send and receive purchase orders items."
                noBorder
            >
                <PurchaseOrderSearchHeader
                    showAdvancedSearch={() => setShowAdvancedSearch(true)}
                    startAll
                />
                <PurchaseOrderList 
                    hasSearched={hasSearched} 
                    isPurchaseOrdersLoading={isPurchaseOrdersLoading} 
                    purchaseOrders={purchaseOrderData} 
                    perPage={purchaseOrderSearchParams.perPage}
                />
            </OuterContainer>

            <PurchaseOrderAdvancedSearch
                show={showAdvancedSearch}
                hideFunc={() => setShowAdvancedSearch(false)}
            />
        </>
    )
}

export default PurchaseOrders