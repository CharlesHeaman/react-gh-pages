import { ChangeEvent } from "react"
import IntegerInput from "../../../../components/form/IntegerInput/IntegerInput"
import Label from "../../../../components/ui/General/Label/Label"
import formatDays from "../../../../utils/formatDays"
import formatHours from "../../../../utils/formatHours"
import { EditQuoteVisits } from "./QuotedEquipmentTab"
import getQuoteLabourTypeText from "../utils/getQuoteLabourTypeText"
import getLabourTypeColor from "../utils/getLabourTypeColor"

const EditEquipmentQuoteVisitsRow = (props: {
    quoteVisits: EditQuoteVisits,
    maxHours: number,
    dayLength: number,
    updateQuoteVisits: (quoteVisits: EditQuoteVisits | undefined, event: ChangeEvent<HTMLInputElement>) => void,
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
                <IntegerInput 
                    name={""} 
                    value={props.quoteVisits.visits} 
                    label={"Visits"} 
                    updateFunc={(event) => props.updateQuoteVisits(props.quoteVisits, event)}               
                    required
                    hasSubmitted={true} 
                    prefixIcon="timeline"
                    maxWidth={75}
                /> 
            </td>
        </tr>
    )
}

export default EditEquipmentQuoteVisitsRow