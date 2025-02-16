import { QuoteResponseData } from '../../../types/quote.types';

const filterAcceptedQuotes = (quotes: Array<QuoteResponseData>): Array<QuoteResponseData> => {
    return quotes.filter(quote => quote.data.status === 1 || quote.data.status === 5)
}

export default filterAcceptedQuotes