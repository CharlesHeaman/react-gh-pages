import { ProductResponseData } from "../../types/products.types";
import RequisitionedItemsList from "../Requisitions/components/RequisitionedItemsList";
import { ReceivePurchaseOrderLineData } from "./components/PurchaseOrderSideBar/PurchaseOrderActions/components/ReceivePurchaseOrderLinesList";
import getMappedRequisitionLine from "./utils/getMappedRequisitionLine";

const ReceivePurchaseOrderItemsRequisitionLines = (props: {
    purchaseOrderLinesReceive: Array<ReceivePurchaseOrderLineData>,
    products: Array<ProductResponseData>
}) => {
    const mappedRequisitionLines = {
        object: '',
        url: '',
        pages: {
            next_url: null,
            previous_url: null,
            per_page: 0
        },
        total_count: props.purchaseOrderLinesReceive.length,
        data_updated_at: new Date(),
        data: props.purchaseOrderLinesReceive.map(line => {
            return {
                id: -1,
                data: getMappedRequisitionLine(line, props.products),
                object: '',
                url: '',
                data_updated_at: new Date()
            }
        })
    }
    
    return (
        <section>
            <h2>Requisitioned Items</h2>
            <RequisitionedItemsList 
                isRequisitionLinesLoading={false} 
                requisitionLines={mappedRequisitionLines} 
                perPage={mappedRequisitionLines.total_count}    
                hideRequisition  
                hidePagination
                smallNoneFound          
            />
        </section>
    )
}

export default ReceivePurchaseOrderItemsRequisitionLines