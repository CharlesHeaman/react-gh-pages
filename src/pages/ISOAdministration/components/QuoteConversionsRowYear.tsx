import { QuoteResponseData } from "../../../types/quote.types";
import filterAcceptedQuotes from "../utils/filterAcceptedQuotes";
import filterRevisionNumberQuotes from "../utils/filterRevisionNumberQuotes";

const QuoteConversionsRowYear = (props: {
    quotes: Array<QuoteResponseData>,
}) => {
    const acceptedQuotesCount = filterAcceptedQuotes(props.quotes).length;
    const totalQuotesCount = filterRevisionNumberQuotes(props.quotes, 0).length;
    return (
        <>
            {Math.round((acceptedQuotesCount / totalQuotesCount) * 100)}% ({acceptedQuotesCount}/{totalQuotesCount})
        </>
    )
}

export default QuoteConversionsRowYear