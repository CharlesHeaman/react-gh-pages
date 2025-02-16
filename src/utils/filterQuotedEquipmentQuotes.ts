import { QuoteResponseData } from '../types/quote.types';

const filterQuotedEquipmentQuotes = (quotes: Array<QuoteResponseData>, quoteIDs: Array<number>): Array<QuoteResponseData> => {
    return quotes.filter(quote => quoteIDs.includes(quote.id))
}

export default filterQuotedEquipmentQuotes