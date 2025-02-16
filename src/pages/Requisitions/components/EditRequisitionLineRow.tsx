import { ChangeEvent } from "react"
import ActionMenu from "../../../components/form/ActionMenu/ActionMenu"
import IntegerInput from "../../../components/form/IntegerInput/IntegerInput"
import Label from "../../../components/ui/General/Label/Label"
import { ProductResponseData } from "../../../types/products.types"
import formatMoney from "../../../utils/formatMoney"
import ProductLink from "../../Products/components/ProductLink"
import { EditRequisitionLineData } from "./EditRequisitionedItemsList"

const EditRequisitionLineRow = (props: {
    requisitionLine: EditRequisitionLineData,
    product: ProductResponseData | undefined,
    updateFunc: (lineID: number, name: string, value: string) => void,
    removeFunc: (lineID: number) => void,
}) => {
    const updateLine = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => {
        props.updateFunc(
            props.requisitionLine.line_id,
            event.target.name,
            event.target.value
        )
    }

    const quantity = isNaN(parseInt(props.requisitionLine.quantity)) ? 1 : parseInt(props.requisitionLine.quantity);
    
    return (
        <tr>
            {/* Quantity */}
            <td>
                <IntegerInput
                    name="quantity"
                    value={props.requisitionLine.quantity.toString()}
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
                    isSundry={props.product.data.is_sundry}
                /> : 
                <Label text="Free Text" color="grey" iconFont="edit_note"/>
            }</td>
            {/* Catalogue Number */}
            <td className="text-left">{props.requisitionLine.catalogue_number}</td>
            {/* Description */}
            <td className="text-left">{props.requisitionLine.product_description}</td>
             {/* Unit */}
            <td>{props.requisitionLine.product_unit}</td>
            {/* Price */}
            <td className="text-right">{formatMoney(props.requisitionLine.nett_price)}</td>
            {/* Total Price */}
            <td className="text-right">{formatMoney(props.requisitionLine.nett_price * quantity)}</td>
            <td>
                <ActionMenu 
                    actionItems={[{
                        iconFont: 'delete',
                        text: 'Remove',
                        clickFunc: () => props.removeFunc(props.requisitionLine.line_id)
                    }]}
                />
            </td> 

        </tr>
    )
}

export default EditRequisitionLineRow