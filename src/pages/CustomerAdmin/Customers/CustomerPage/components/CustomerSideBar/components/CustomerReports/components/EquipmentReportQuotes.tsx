import InnerContainer from "../../../../../../../../../components/ui/Containers/InnerContainer/InnerContainer"
import NoneFound from "../../../../../../../../../components/ui/General/NoneFound/NoneFound"
import { QuoteResponseData } from "../../../../../../../../../types/quote.types"
import { QuotedEquipmentResponseData } from "../../../../../../../../../types/quotedEquipment.types"
import filterQuotedEquipmentQuotes from "../../../../../../../../../utils/filterQuotedEquipmentQuotes"
import findQuote from "../../../../../../../../../utils/findQuote"
import findQuoteByID from "../../../../../../../../../utils/findQuoteByID"
import EquipmentReportQuoteRow from "./EquipmentReportQuoteRow"

const EquipmentReportQuotes = (props: {
    quotedEquipment: Array<QuotedEquipmentResponseData>,
    quotes: Array<QuoteResponseData>,
}) => {

    // const filteredQuotes = filterQuotedEquipmentQuotes(props.quotes, props.quotedEquipment.map(quotedEquipment => quotedEquipment.data.quote_id));

    return (
        props.quotedEquipment.length > 0 ? 
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Quote</th>
                        <th>Quote Description</th>
                        <th>Response</th>
                    </tr>
                </thead>
                <tbody>                                    
                    {props.quotedEquipment.map((quotedEquipment, index) => 
                        <EquipmentReportQuoteRow
                            quotedEquipment={quotedEquipment}
                            quote={findQuoteByID(props.quotes, quotedEquipment.data.quote_id)}
                            key={index}
                        />
                    )}
                </tbody>
            </table> :
            <InnerContainer>
                <NoneFound
                    iconFont="request_quote"
                    text={`No quotes found`}
                    small
                />
            </InnerContainer>
    )
}

export default EquipmentReportQuotes