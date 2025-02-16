import Label from "../../../../components/ui/General/Label/Label";
import { QuotedEquipmentResponseData, QuoteVisits } from "../../../../types/quotedEquipment.types";
import { QuotedSiteResponseData } from "../../../../types/quotedSites.types";
import formatHours from "../../../../utils/formatHours";
import formatMoney from "../../../../utils/formatMoney";
import getQuotedEquipmentLabourRate from "../utils/getDepartmentLabourRate";
import getLabourTypeColor from "../utils/getLabourTypeColor";
import getQuoteLabourTypeText from "../utils/getQuoteLabourTypeText";
import getQuoteTravelRowTotalCost from "../utils/getQuoteTravelRowTotalCost";

const EquipmentQuoteTravelRow = (props: {
    equipmentQuoteDetails: QuotedEquipmentResponseData | QuotedSiteResponseData
    quoteVisits: QuoteVisits,
}) => {
    const labourTypeText = getQuoteLabourTypeText(props.quoteVisits.is_out_of_hours, props.quoteVisits.is_double_time);

    const engineerCount = !props.quoteVisits.is_mate ? props.equipmentQuoteDetails.data.number_of_engineers : props.equipmentQuoteDetails.data.number_of_mates

    return (
        <tr>
            <td>
                <Label
                    text={`${!props.quoteVisits.is_mate ? 'Engineer' : 'Mate'} ${labourTypeText}`}
                    color={getLabourTypeColor(props.quoteVisits.is_mate, props.quoteVisits.is_out_of_hours, props.quoteVisits.is_double_time)}
                    iconFont={!props.quoteVisits.is_mate ? 'person' : 'person_add'}
                />
            </td>
            <td className="text-right">{formatHours(props.equipmentQuoteDetails.data.travel_time)} hrs</td>
            <td className="text-right">{formatMoney(getQuotedEquipmentLabourRate(props.equipmentQuoteDetails, props.quoteVisits.is_mate, props.quoteVisits.is_out_of_hours, props.quoteVisits.is_double_time))}</td>
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
            <td className="text-right">{formatMoney(getQuoteTravelRowTotalCost(props.equipmentQuoteDetails, props.quoteVisits))}</td>
        </tr>
    )
}

export default EquipmentQuoteTravelRow