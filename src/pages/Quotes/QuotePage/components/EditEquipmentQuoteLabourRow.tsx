import { ChangeEvent } from "react"
import HoursInput from "../../../../components/form/HoursInput/HoursInput"
import Label from "../../../../components/ui/General/Label/Label"
import formatMoney from "../../../../utils/formatMoney"
import getLabourTypeColor from "../utils/getLabourTypeColor"
import getQuoteLabourTypeText from "../utils/getQuoteLabourTypeText"
import { EditQuoteLabour } from "./QuotedEquipmentTab"

const EditEquipmentQuoteLabourRow = (props: {
    quoteLabour: EditQuoteLabour | undefined,
    updateQuoteLabour: (quoteLabour: EditQuoteLabour | undefined, event: ChangeEvent<HTMLInputElement>) => void,
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
            <td>{formatMoney(props.quoteLabour.rate)}</td>
            <td>
                <HoursInput 
                    name={""} 
                    value={props.quoteLabour.hours} 
                    label={"Travel time"} 
                    updateFunc={(event) => props.updateQuoteLabour && props.updateQuoteLabour(props.quoteLabour, event)} 
                    required
                    hasSubmitted={true}
                />
            </td>
            <td>{formatMoney(props.quoteLabour.rate * parseFloat(props.quoteLabour.hours))}</td>
        </tr> : null
    )
}

export default EditEquipmentQuoteLabourRow