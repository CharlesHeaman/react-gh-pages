import { QuoteResponseData } from "../types/quote.types";

const findQuoteByID = (quotes: Array<QuoteResponseData>, quoteID: number): QuoteResponseData | undefined => {
    return quotes.find(quote => quote.id === quoteID)
}

export default findQuoteByID