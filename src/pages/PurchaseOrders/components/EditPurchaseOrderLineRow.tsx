import { ChangeEvent } from "react"
import ActionMenu from "../../../components/form/ActionMenu/ActionMenu"
import IntegerInput from "../../../components/form/IntegerInput/IntegerInput"
import TextInput from "../../../components/form/TextInput/TextInput"
import { ProductResponseData } from "../../../types/products.types"
import formatMoney from "../../../utils/formatMoney"
import ProductLink from "../../Products/components/ProductLink"
import { EditPurchaseOrderLineData } from "./EditPurchaseOrderLinesList"
import Label from "../../../components/ui/General/Label/Label"
import MoneyInput from "../../../components/form/MoneyInput/MoneyInput"

const EditPurchaseOrderLineRow = (props: {
    purchaseOrderLine: EditPurchaseOrderLineData,
    product: ProductResponseData | undefined,
    updateFunc: (lineID: number, name: string, value: string) => void,
    removeFunc: (lineID: number) => void
}) => {
    const updateLine = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => {
        props.updateFunc(
            props.purchaseOrderLine.line_id,
            event.target.name,
            event.target.value
        )
    }
    
    return (
        <tr>      
            {/* Quantity Ordered */}
            <td>
                <IntegerInput
                    name="quantity_ordered"
                    value={props.purchaseOrderLine.quantity_ordered.toString()}
                    updateFunc={updateLine}
                    label="Quantity"
                    required
                    hasSubmitted={false}
                    maxWidth={55}
                />
            </td>
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
            {/* Price */}
            <td className="text-right">
                <MoneyInput
                    name="product_price"
                    value={props.purchaseOrderLine.product_price}
                    updateFunc={updateLine}
                    label="Price"
                    required
                    hasSubmitted={false}
                    maxWidth={100}
                />
            </td>
            {/* Total Price */}
            <td className="text-right">{formatMoney(parseFloat(props.purchaseOrderLine.product_price) * parseInt(props.purchaseOrderLine.quantity_ordered))}</td>
            <td>
                <ActionMenu 
                    actionItems={[{
                        iconFont: 'delete',
                        text: 'Remove',
                        clickFunc: () => props.removeFunc(props.purchaseOrderLine.line_id)
                    }]}
                />
            </td> 
        </tr> 
    )
}

export default EditPurchaseOrderLineRow