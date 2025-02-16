import { QuoteResponseData } from '../../../types/quote.types';

const filterYearSentQuotes = (quotes: Array<QuoteResponseData>, year: number): Array<QuoteResponseData> => {
    return quotes.filter(quote => (
        quote.data.sent_at &&
        new Date(quote.data.sent_at).getFullYear()) === year
    )
}

export default filterYearSentQuotes