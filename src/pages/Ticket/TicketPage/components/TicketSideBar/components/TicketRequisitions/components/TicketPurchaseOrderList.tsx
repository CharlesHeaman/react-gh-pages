import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import WindowOverlay from "../../../../../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import { PurchaseOrderCollectionResponse } from "../../../../../../../../types/purchaseOrder.types";
import getAPI from "../../../../../../../../utils/getAPI";
import PurchaseOrderList from "../../../../../../../PurchaseOrders/components/PurchaseOrderList";
import PurchaseOrderSearchHeader from "../../../../../../../PurchaseOrders/components/PurchaseOrderSearchHeader";
import getPurchaseOrderSearchParams from "../../../../../../../PurchaseOrders/utils/getPurchaseOrderSearchParam";

const TicketPurchaseOrdersList = (props: {
    ticketID: number,
    ticketType: number,
    ticketNumber: number,
    departmentID: number,
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
    }, [JSON.stringify(purchaseOrderSearchParams), props.ticketNumber])


    const searchPurchaseOrders = () => {
        getAPI('purchase_orders', {
            ...purchaseOrderSearchParams,
            tickets: [{
                department_id: props.departmentID,
                ticket_number: props.ticketNumber
            }],
        }, (response: any) => {
            const purchaseOrderData: PurchaseOrderCollectionResponse = response.data;
            setPurchaseOrderData(purchaseOrderData);
        }, setIsPurchaseOrdersLoading)
    }
    
    return (
        <WindowOverlay 
            title={"Ticket Purchase Orders"} 
            maxWidth={1100} 
            show={props.show}
            hideFunc={props.hideFunc} 
            top
        >
            <PurchaseOrderSearchHeader
                ticketID={props.ticketID}
                ticketType={props.ticketType}
                startAll
            />
            <PurchaseOrderList 
                isPurchaseOrdersLoading={isPurchaseOrdersLoading} 
                purchaseOrders={purchaseOrderData} 
                perPage={purchaseOrderSearchParams.perPage}
                totalCount={props.totalCount}
                hideType
                hideCustomer
                hasSearched
            />
        </WindowOverlay>
    )
}

export default TicketPurchaseOrdersList