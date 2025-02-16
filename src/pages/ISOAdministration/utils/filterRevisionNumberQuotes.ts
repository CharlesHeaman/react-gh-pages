import { QuoteResponseData } from '../../../types/quote.types';

const filterRevisionNumberQuotes = (quotes: Array<QuoteResponseData>, revisionNumber: number): Array<QuoteResponseData> => {
    return quotes.filter(quote => quote.data.revision_number === revisionNumber)
}

export default filterRevisionNumberQuotes