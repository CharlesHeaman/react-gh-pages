import { QuoteLineResponseData } from "../../../../types/quoteLine.types"
import formatHours from "../../../../utils/formatHours"
import formatMinutes from "../../../../utils/formatMinutes"
import getEquipmentLineTotal from "../utils/getEquipmentLineTotal"

const QuoteEquipmentLineRow = (props: {
    quoteLine: QuoteLineResponseData,
}) => {
    return (
        <tr>
            <td>{props.quoteLine.data.quantity}</td>
            <td className="text-left">{props.quoteLine.data.description}</td>
            <td>{formatMinutes(props.quoteLine.data.price)} min</td>
            <td className="text-right">{formatHours(getEquipmentLineTotal(props.quoteLine))} hrs</td>
        </tr>
    )
}

export default QuoteEquipmentLineRow