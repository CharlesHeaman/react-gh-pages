import { QuoteLineResponseData } from './../../../../types/quoteLine.types';
import getMaterialLineTotal from './getMaterialLineTotal';

const reduceQuoteMaterialTotal = (quoteLines: Array<QuoteLineResponseData>) => {
    return quoteLines.reduce((total: number, quoteLine) => {
        return total + getMaterialLineTotal(quoteLine);
    }, 0)
}

export default reduceQuoteMaterialTotal