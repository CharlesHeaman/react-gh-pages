import { QuoteLineResponseData } from './../../../../types/quoteLine.types';
import getEquipmentLineTotal from './getEquipmentLineTotal';

const reduceQuoteEquipmentTotal = (quoteLines: Array<QuoteLineResponseData>) => {
    return quoteLines.reduce((total: number, quoteLine) => {
        return total + getEquipmentLineTotal(quoteLine);
    }, 0)
}

export default reduceQuoteEquipmentTotal