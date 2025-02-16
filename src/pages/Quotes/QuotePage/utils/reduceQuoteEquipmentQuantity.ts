import { QuoteLineResponseData } from './../../../../types/quoteLine.types';

const reduceQuoteEquipmentQuantity = (quoteLines: Array<QuoteLineResponseData>) => {
    return quoteLines.reduce((total: number, quoteLine) => {
        return total + quoteLine.data.quantity;
    }, 0)
}

export default reduceQuoteEquipmentQuantity