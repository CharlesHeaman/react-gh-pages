import { ChangeEvent } from "react"
import IntegerInput from "../../../components/form/IntegerInput/IntegerInput"
import Label from "../../../components/ui/General/Label/Label"
import { ProductResponseData } from "../../../types/products.types"
import ProductLink from "../../Products/components/ProductLink"
import { ReceivePurchaseOrderLineData } from "./PurchaseOrderSideBar/PurchaseOrderActions/components/ReceivePurchaseOrderLinesList"
import formatMoney from "../../../utils/formatMoney"
import MoneyInput from "../../../components/form/MoneyInput/MoneyInput"

const ReceivePurchaseOrderLineRow = (props: {
    purchaseOrderLine: ReceivePurchaseOrderLineData,
    product: ProductResponseData | undefined,
    isPreview?: boolean,
    isReconcile?: boolean,
    updateFunc?: (lineID: number, name: string, value: string) => void
}) => {
    const updateLine = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => {
        props.updateFunc && props.updateFunc(
            props.purchaseOrderLine.line_id,
            event.target.name,
            event.target.value
        )
    }

    const outstandingCount = !props.isReconcile ? 
        props.purchaseOrderLine.quantity_ordered - props.purchaseOrderLine.quantity_received :
        props.purchaseOrderLine.accounts_quantity_outstanding
    const newReceived = parseInt(props.purchaseOrderLine.new_quantity_received);
    return (
        !props.isPreview || parseInt(props.purchaseOrderLine.new_quantity_received) > 0 ?
            <tr>
                <td>
                    {!props.isPreview ?
                        <IntegerInput
                            name="new_quantity_received"
                            value={(props.purchaseOrderLine.new_quantity_received).toString()}
                            updateFunc={updateLine}
                            label="Received quantity"
                            required
                            hasSubmitted={false}
                            maxWidth={55}
                        /> :
                        <Label 
                            iconFont={outstandingCount === newReceived ? 'done'
                                : newReceived > outstandingCount ? 'priority_high' 
                                : newReceived < outstandingCount ? 'pending' 
                                : 'not_interested'
                            }
                            text={props.purchaseOrderLine.new_quantity_received.toString()} 
                            color={outstandingCount === newReceived ? 'dark-blue'
                                : newReceived > outstandingCount ? 'red'
                                : newReceived < outstandingCount ? 'light-blue'
                                : 'grey'
                            }
                        />
                    }
                </td>
                {/* Quantity Outstanding */}
                <td className="text-right">{outstandingCount}</td>
                {/* Product */}
                <td className="text-left">{props.product ? 
                    <ProductLink 
                        productID={props.product.id}
                        isStock={props.product.data.is_stock}
                    /> : 
                    <Label text="Free Text" color="grey" iconFont="edit_note"/>
                }</td>            
                {/* Catalogue Number */}
                <td className="text-left">{props.purchaseOrderLine.catalogue_number}</td>
                {/* Description */}
                <td className="text-left">{props.purchaseOrderLine.product_description}</td>
                {/* Unit */}
                <td>{props.product ? props.product.data.unit : ''}</td>
                {/* Product Price */}
                <td className="text-right">{formatMoney(props.purchaseOrderLine.product_price)}</td>
                {/* Invoiced Price */}
                {props.isReconcile && <td>
                    {!props.isPreview ? 
                        <MoneyInput
                            name="invoiced_price"
                            value={props.purchaseOrderLine.invoiced_price}
                            updateFunc={updateLine}
                            label="Invoiced price"
                            required
                            hasSubmitted={false}
                        /> :
                        <Label
                            iconFont={props.purchaseOrderLine.product_price === parseFloat(props.purchaseOrderLine.invoiced_price) ? 'balance' : 
                                props.purchaseOrderLine.product_price < parseFloat(props.purchaseOrderLine.invoiced_price) ? 'arrow_upward' :
                                'arrow_downward'} 
                            color={props.purchaseOrderLine.product_price === parseFloat(props.purchaseOrderLine.invoiced_price) ? 'dark-blue' : 
                                props.purchaseOrderLine.product_price < parseFloat(props.purchaseOrderLine.invoiced_price) ? 'light-green' :
                                'red'}
                            text={formatMoney(props.purchaseOrderLine.invoiced_price)}
                        />
                    }
                </td>}
            </tr>
            : null
    )
}

export default ReceivePurchaseOrderLineRow