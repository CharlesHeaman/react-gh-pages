import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { PurchaseOrderActivityCollectionResponse } from "../../../../../types/purchaseOrderActivity.types";
import WindowOverlay from "../../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import getAPI from "../../../../../utils/getAPI";
import getPaginationParams from "../../../../../utils/getPaginationParams";
import PurchaseOrderActivityList from "./PurchaseOrderActivityList";


const PurchaseOrderHistory = (props: {
    purchaseOrderID: number,
    totalCount: number,
    show: boolean,
    hideFunc: () => void
}) => {
    const [searchParams] = useSearchParams();

    // Data States
    const [isActivityLoading, setIsActivityLoading] = useState(true);
    const [activityData, setActivityData] = useState<PurchaseOrderActivityCollectionResponse>();

    // Search Parameters
    const paginationParams = getPaginationParams(searchParams, 'purchase_order_activity');

    useEffect(() => {
        getActivity();
    }, [JSON.stringify(paginationParams), props.purchaseOrderID])

    const getActivity = () => {
        getAPI(`purchase_order_activity`, {
            ...paginationParams,
            purchase_order_id: props.purchaseOrderID
        }, (response: any) => {
            const purchaseOrderActivityData: PurchaseOrderActivityCollectionResponse = response.data;
            setActivityData(purchaseOrderActivityData);
        }, setIsActivityLoading)    
    } 
    return (
        <WindowOverlay 
            title="Purchase Order History"
            show={props.show}
            hideFunc={props.hideFunc}
            maxWidth={600}        
            top
        >
            <PurchaseOrderActivityList
                isPurchaseOrderActivityLoading={isActivityLoading}
                purchaseOrderActivity={activityData}
                perPage={paginationParams.perPage}
                totalCount={props.totalCount}
            />
        </WindowOverlay>
    )
}

export default PurchaseOrderHistory