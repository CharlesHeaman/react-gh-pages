import { EditQuoteLineData } from '../components/EditEquipmentQuoteMaterials';

const getEditMaterialLineTotal = (quoteLine: EditQuoteLineData): number => {
    const quantity = isNaN(parseInt(quoteLine.quantity)) ? 1 : parseInt(quoteLine.quantity);
    const price = isNaN(parseFloat(quoteLine.price)) ? 0 : parseFloat(quoteLine.price);
    const markup = isNaN(parseInt(quoteLine.markup)) ? 0 : parseInt(quoteLine.markup);

    const total = quantity * price;
    return total + (total * markup / 100);
}

export default getEditMaterialLineTotal