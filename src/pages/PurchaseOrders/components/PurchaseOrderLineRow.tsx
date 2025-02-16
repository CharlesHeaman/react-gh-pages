import Label from "../../../components/ui/General/Label/Label"
import NewPurchaseOrderLink from "../../../components/ui/Links/NewPurchaseOrderLink"
import { ProductResponseData } from "../../../types/products.types"
import { PurchaseOrderLineResponseData } from "../../../types/purchaseOrderLines.types"
import formatMoney from "../../../utils/formatMoney"
import ProductLink from "../../Products/components/ProductLink"
import RequisitionLink from "../../Requisitions/components/RequisitionLink"

const PurchaseOrderLineRow = (props: {
    purchaseOrderLine: PurchaseOrderLineResponseData,
    hidePurchaseOrder?: boolean,
    product: ProductResponseData | undefined,
    isSent?: boolean,
}) => {

    const accountsReceived = props.purchaseOrderLine.data.quantity_ordered - props.purchaseOrderLine.data.accounts_quantity_outstanding;
    return (
        <tr>
            {/* Purchase Order */}
            {!props.hidePurchaseOrder ? <td><NewPurchaseOrderLink purchaseOrderID={props.purchaseOrderLine.data.purchase_order_id}/></td> : null}
            {/* Quantity Received */}
            {props.isSent && <td className="text-right">
                <Label 
                    iconFont={props.purchaseOrderLine.data.quantity_ordered === props.purchaseOrderLine.data.quantity_received ? 'done'
                        : props.purchaseOrderLine.data.quantity_received > props.purchaseOrderLine.data.quantity_ordered ? 'priority_high' 
                        : props.purchaseOrderLine.data.quantity_received < props.purchaseOrderLine.data.quantity_ordered ? 'pending' 
                        : 'not_interested'
                    }
                    text={props.purchaseOrderLine.data.quantity_received.toString()} 
                    color={props.purchaseOrderLine.data.quantity_ordered === props.purchaseOrderLine.data.quantity_received ? 'dark-blue'
                        : props.purchaseOrderLine.data.quantity_received > props.purchaseOrderLine.data.quantity_ordered ? 'red'
                        : props.purchaseOrderLine.data.quantity_received < props.purchaseOrderLine.data.quantity_ordered ? 'light-blue'
                        : 'grey'
                    }
                />
            </td>}
            {/* Quantity Reconciled */}
            {props.isSent && <td className="text-right">
                <Label 
                    iconFont={props.purchaseOrderLine.data.quantity_ordered === accountsReceived ? 'done'
                        : accountsReceived > props.purchaseOrderLine.data.quantity_ordered ? 'priority_high' 
                        : accountsReceived < props.purchaseOrderLine.data.quantity_ordered ? 'pending' 
                        : 'not_interested'
                    }
                    text={accountsReceived.toString()} 
                    color={props.purchaseOrderLine.data.quantity_ordered === accountsReceived ? 'dark-blue'
                        : accountsReceived > props.purchaseOrderLine.data.quantity_ordered ? 'red'
                        : accountsReceived < props.purchaseOrderLine.data.quantity_ordered ? 'light-blue'
                        : 'grey'
                    }
                />
            </td>}
            {/* Quantity Ordered */}
            <td className="text-right">{props.purchaseOrderLine.data.quantity_ordered}</td>
            {/* Requisition */}
            {props.isSent && <td>{props.purchaseOrderLine.data.requisition_number ? 
                <RequisitionLink requisitionNumber={props.purchaseOrderLine.data.requisition_number}/> : 
                'None'
            }</td>}
            {/* Product */}
            <td className="text-left">{props.product ? 
                <ProductLink 
                    productID={props.product.id}
                    isStock={props.product.data.is_stock}
                /> : 
                <Label text="Free Text" color="grey" iconFont="edit_note"/>
            }</td>
            {/* Catalogue Number */}
            <td className="text-left">{props.purchaseOrderLine.data.catalogue_number}</td>
            {/* Description */}
            <td className="text-left">{props.purchaseOrderLine.data.product_description}</td>
            {/* Unit */}
            <td>{props.product ? props.product.data.unit : ''}</td>
            {/* Price */}
            <td className="text-right">{formatMoney(props.purchaseOrderLine.data.product_price)}</td>
            {/* Total Price */}
            <td className="text-right">{formatMoney(props.purchaseOrderLine.data.product_price * props.purchaseOrderLine.data.quantity_ordered)}</td>
        </tr> 
    )
}

export default PurchaseOrderLineRow