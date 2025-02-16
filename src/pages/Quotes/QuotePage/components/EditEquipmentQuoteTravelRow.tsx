import Label from "../../../../components/ui/General/Label/Label";
import formatHours from "../../../../utils/formatHours";
import formatMoney from "../../../../utils/formatMoney";
import getLabourTypeColor from "../utils/getLabourTypeColor";
import getEditQuoteEngineerCount from "../utils/getQuoteEngineerCount";
import getQuoteLabourTypeText from "../utils/getQuoteLabourTypeText";
import getQuoteMateCount from "../utils/getQuoteMateCount";
import getQuoteTravelTime from "../utils/getQuoteTravelTime";
import getEditQuoteTravelRowTotalCost from "../utils/getEditQuoteTravelRowTotalCost";
import { EditEquipmentQuote, EditQuoteVisits } from "./QuotedEquipmentTab";

const EditEquipmentQuoteTravelRow = (props: {
    equipmentQuoteDetails: EditEquipmentQuote
    quoteVisits: EditQuoteVisits,
}) => {
    const labourTypeText = getQuoteLabourTypeText(props.quoteVisits.is_out_of_hours, props.quoteVisits.is_double_time);

    const engineerCount = !props.quoteVisits.is_mate ? getEditQuoteEngineerCount(props.equipmentQuoteDetails) : getQuoteMateCount(props.equipmentQuoteDetails)

    return (
        <tr>
            <td>
                <Label
                    text={`${!props.quoteVisits.is_mate ? 'Engineer' : 'Mate'} ${labourTypeText}`}
                    color={getLabourTypeColor(props.quoteVisits.is_mate, props.quoteVisits.is_out_of_hours, props.quoteVisits.is_double_time)}
                    iconFont={!props.quoteVisits.is_mate ? 'person' : 'person_add'}
                />
            </td>
            <td className="text-right">{formatHours(getQuoteTravelTime(props.equipmentQuoteDetails))} hrs</td>
            <td className="text-right">{formatMoney(props.quoteVisits.rate)}</td>
            <td><div className="flex">
                <div className="flex">
                    <span className="material-icons">timeline</span>
                    {props.quoteVisits.visits}
                </div>
                x
                <div className="flex">
                    <span className="material-icons">{!props.quoteVisits.is_mate ? 'person' : 'person_add'}</span>
                    {engineerCount}
                </div>
            </div></td>
            <td className="text-right">{formatMoney(getEditQuoteTravelRowTotalCost(props.equipmentQuoteDetails, props.quoteVisits))}</td>
        </tr>
    )
}

export default EditEquipmentQuoteTravelRow