import Label from "../../../../components/ui/General/Label/Label"
import { QuoteLabour } from "../../../../types/quotedSites.types"
import formatMoney from "../../../../utils/formatMoney"
import getLabourTypeColor from "../utils/getLabourTypeColor"
import getQuoteLabourTypeText from "../utils/getQuoteLabourTypeText"

const EquipmentQuoteLabourRow = (props: {
    quoteLabour: QuoteLabour | undefined,
    rate: number
}) => {
    const labourTypeText = props.quoteLabour && getQuoteLabourTypeText(props.quoteLabour.is_out_of_hours, props.quoteLabour.is_double_time);

    return (
        props.quoteLabour ? <tr>
            <td>
                <Label
                    text={`${!props.quoteLabour.is_mate ? 'Engineer' : 'Mate'} #${props.quoteLabour.engineer_index + 1} ${labourTypeText}`}
                    color={getLabourTypeColor(props.quoteLabour.is_mate, props.quoteLabour.is_out_of_hours, props.quoteLabour.is_double_time)}
                    iconFont={!props.quoteLabour.is_mate ? 'person' : 'person_add'}
                />
            </td>
            <td>{formatMoney(props.rate)}</td>
            <td>{props.quoteLabour.hours} hrs</td>
            <td>{formatMoney(props.rate * props.quoteLabour.hours)}</td>
        </tr> : null
    )
}

export default EquipmentQuoteLabourRow