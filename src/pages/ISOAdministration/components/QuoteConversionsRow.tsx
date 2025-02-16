import { DepartmentResponseData } from "../../../types/department.types"
import { QuoteResponseData } from "../../../types/quote.types"
import getYearRelativeDate from "../../../utils/getYearRelativeDate"
import filterYearSentQuotes from "../utils/filterYearSentQuotes"
import QuoteConversionsRowYear from "./QuoteConversionsRowYear"

const QuoteConversionsRow = (props: {
    department: DepartmentResponseData,
    quotes: Array<QuoteResponseData>
}) => {
    return (
        <tr>
            <td>{props.department.data.name}</td>
            <td>
                <QuoteConversionsRowYear
                    quotes={filterYearSentQuotes(props.quotes, getYearRelativeDate(new Date(), -3).getFullYear())}
                />
            </td>
            <td>
                <QuoteConversionsRowYear
                    quotes={filterYearSentQuotes(props.quotes, getYearRelativeDate(new Date(), -2).getFullYear())}
                />
            </td>
            <td>
                <QuoteConversionsRowYear
                    quotes={filterYearSentQuotes(props.quotes, getYearRelativeDate(new Date(), -1).getFullYear())}
                />
            </td>
        </tr>
    )
}

export default QuoteConversionsRow