import { QuoteResponseData } from "../../../../../../../../../types/quote.types"
import { QuotedEquipmentResponseData } from "../../../../../../../../../types/quotedEquipment.types"
import formatDate from "../../../../../../../../../utils/formatDate"
import NewQuoteLink from "../../../../../../../../Quotes/components/NewQuoteLink"
import QuoteResponseLabel from "../../../../../../../../Quotes/components/QuoteResponseLabel"

const EquipmentReportQuoteRow = (props: {
    quotedEquipment: QuotedEquipmentResponseData,
    quote: QuoteResponseData | undefined,
}) => {
    return (
        props.quote ?
            <tr>
                <td>{props.quote.data.sent_at ? formatDate(props.quote.data.sent_at) : null}</td>
                <td><NewQuoteLink departmentName={""} number={props.quote.data.number}/></td>
                <td className="text-left">{props.quote.data.description}</td>
                <td><QuoteResponseLabel status={props.quote.data.status}/></td>
            </tr> :
            null
    )
}

export default EquipmentReportQuoteRow