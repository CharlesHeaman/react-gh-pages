import { QuoteLineResponseData } from './../../../../types/quoteLine.types';

const getEquipmentLineTotal = (quoteLine: QuoteLineResponseData): number => {
    return quoteLine.data.quantity * quoteLine.data.price / 60;
}

export default getEquipmentLineTotal