import { EditPurchaseOrderLineData } from '../components/EditPurchaseOrderLinesList';

const reduceEditPurchaseOrderLinesCost = (purchaseOrderLines: Array<EditPurchaseOrderLineData>): number => {
    return purchaseOrderLines.reduce((totalCost, currentLine) => totalCost + (currentLine.product_price * currentLine.quantity_ordered), 0);
}

export default reduceEditPurchaseOrderLinesCost