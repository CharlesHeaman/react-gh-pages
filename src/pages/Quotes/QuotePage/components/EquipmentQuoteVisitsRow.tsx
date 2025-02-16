import Label from "../../../../components/ui/General/Label/Label"
import { QuoteVisits } from "../../../../types/quotedEquipment.types"
import formatDays from "../../../../utils/formatDays"
import formatHours from "../../../../utils/formatHours"
import getLabourTypeColor from "../utils/getLabourTypeColor"
import getQuoteLabourTypeText from "../utils/getQuoteLabourTypeText"

const EquipmentQuoteVisitsRow = (props: {
    quoteVisits: QuoteVisits,
    maxHours: number,
    dayLength: number,
}) => {
    const labourTypeText = getQuoteLabourTypeText(props.quoteVisits.is_out_of_hours, props.quoteVisits.is_double_time);

    return (
        <tr>
            <td>
                <Label
                    text={`${!props.quoteVisits.is_mate ? 'Engineer' : 'Mate'} ${labourTypeText}`}
                    color={getLabourTypeColor(props.quoteVisits.is_mate, props.quoteVisits.is_out_of_hours, props.quoteVisits.is_double_time)}
                    iconFont={!props.quoteVisits.is_mate ? 'person' : 'person_add'}
                />
            </td>
            <td>{formatHours(props.maxHours)} hrs</td>
            <td>
                <div className="flex">
                    <span className="material-icons">today</span>
                    {formatDays(props.maxHours / props.dayLength)}
                </div>
            </td>
            <td>
                <div className="flex">
                    <span className="material-icons">timeline</span>
                    {props.quoteVisits.visits}
                </div>
            </td>
        </tr>
    )
}

export default EquipmentQuoteVisitsRow