import { PurchaseOrderLineResponseData } from '../../../types/PurchaseOrderLines.types';

const reducePurchaseOrderLinesCost = (purchaseOrderLines: Array<PurchaseOrderLineResponseData>): number => {
    return purchaseOrderLines.reduce((totalCost, currentLine) => totalCost + (currentLine.data.product_price * currentLine.data.quantity_ordered), 0);
}

export default reducePurchaseOrderLinesCost