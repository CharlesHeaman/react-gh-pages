import { QuoteResponseData } from "../types/quote.types";

const findQuote = (quotes: Array<QuoteResponseData>, quoteNumber: number, departmentID: number): QuoteResponseData | undefined => {
    return quotes.find(quote => 
        quote.data.department_id === departmentID && 
        quote.data.number === quoteNumber.toString()
    )
}

export default findQuote