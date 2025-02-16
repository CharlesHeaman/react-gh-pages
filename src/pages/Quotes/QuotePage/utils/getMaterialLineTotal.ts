import { QuoteLineResponseData } from './../../../../types/quoteLine.types';

const getMaterialLineTotal = (quoteLine: QuoteLineResponseData): number => {
    const total = quoteLine.data.quantity * quoteLine.data.price;
    return total + (total * quoteLine.data.markup / 100);
}

export default getMaterialLineTotal