import Label from "../../../../components/ui/General/Label/Label"
import { QuoteLineResponseData } from "../../../../types/quoteLine.types"
import formatMoney from "../../../../utils/formatMoney"
import getMaterialLineTotal from "../utils/getMaterialLineTotal"

const QuoteMaterialsLineRow = (props: {
    quoteLine: QuoteLineResponseData,
}) => {
    return (
        <tr>
            <td>{props.quoteLine.data.category === 1 ? <Label iconFont="inventory_2" color="dark-blue" text="Materials" hideText/> :
                props.quoteLine.data.category === 2 ? <Label iconFont="propane" color="purple" text="Refrigerant" hideText/> :
                <Label iconFont="add" color="light-green" text="Extras/Expenses" hideText/>
            }</td>
            <td>{props.quoteLine.data.quantity}</td>
            <td className="text-left">{props.quoteLine.data.supplier}</td>
            <td className="text-left">{props.quoteLine.data.description}</td>
            <td>{formatMoney(props.quoteLine.data.price)}</td>
            <td>{props.quoteLine.data.markup}%</td>
            <td className="text-right">{formatMoney(getMaterialLineTotal(props.quoteLine))}</td>
        </tr>
    )
}

export default QuoteMaterialsLineRow