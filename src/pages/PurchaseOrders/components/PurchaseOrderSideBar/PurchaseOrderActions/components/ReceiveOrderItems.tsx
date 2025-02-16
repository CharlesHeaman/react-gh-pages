import { Dispatch, SetStateAction } from "react";
import { PurchaseOrderLineCollectionResponse } from "../../../../../../types/PurchaseOrderLines.types";
import ReceivePurchaseOrderLinesList, { ReceivePurchaseOrderLineData } from "./ReceivePurchaseOrderLinesList";

const ReceiveOrderItems = (props: {
    purchaseOrderLines: PurchaseOrderLineCollectionResponse,
    purchaseOrderLinesReceiveData: Array<ReceivePurchaseOrderLineData>,
    setPurchaseOrderLinesReceiveData: Dispatch<SetStateAction<Array<ReceivePurchaseOrderLineData>>>,    
    isPreview?: boolean | undefined,
    isReconcile?: boolean | undefined
}) => {
    return (
        <section>
            <ReceivePurchaseOrderLinesList
                isPurchaseOrderLinesLoading={false} 
                purchaseOrderLines={props.purchaseOrderLines} 
                perPage={props.purchaseOrderLines.total_count}   
                purchaseOrderLinesReceiveData={props.purchaseOrderLinesReceiveData}
                setPurchaseOrderLinesReceiveData={props.setPurchaseOrderLinesReceiveData} 
                isPreview={props.isPreview}
                isReconcile={props.isReconcile}
                smallNoneFound       
            />
        </section>
    )
}

export default ReceiveOrderItems