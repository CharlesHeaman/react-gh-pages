import Label from "../../../components/ui/General/Label/Label"
import { ProductResponseData } from "../../../types/products.types"
import { RequisitionLineResponseData } from "../../../types/requisitionLines.types"
import formatMoney from "../../../utils/formatMoney"
import ProductLink from "../../Products/components/ProductLink"
import RequisitionLink from "./RequisitionLink"

const RequisitionLineRow = (props: {
    requisitionLine: RequisitionLineResponseData,
    hideRequisition?: boolean,
    product: ProductResponseData | undefined,
    showAdjustedPrice?: boolean,
}) => {

    const price = props.showAdjustedPrice ? props.requisitionLine.data.adjusted_price : props.requisitionLine.data.nett_price;
    const totalPrice = price * props.requisitionLine.data.quantity;

    return (
        <tr>
            {!props.hideRequisition ? <td><RequisitionLink requisitionNumber={props.requisitionLine.data.requisition_number}/></td> : null}
            <td>{props.requisitionLine.data.quantity}</td>
            <td className="text-left">{props.product ? <ProductLink 
                productID={props.product.id} 
                isSundry={props.product.data.is_sundry}
                isStock={props.product.data.is_stock}
            /> :
                <Label text="Free Text" color="grey" iconFont="edit_note"/>
            }</td>
            <td className="text-left">{props.requisitionLine.data.catalogue_number}</td>
            <td className="text-left">{props.requisitionLine.data.product_description}</td>
            <td>{props.requisitionLine.data.product_unit}</td>
            <td className="text-right">{price > 0 ? formatMoney(price) : <Label text={formatMoney(price)} color="red" iconFont="priority_high"/>}</td>
            <td className="text-right">{totalPrice > 0 ? formatMoney(totalPrice) : <Label text={formatMoney(totalPrice)} color="red" iconFont="priority_high"/>}</td>
        </tr>
    )
}

export default RequisitionLineRow