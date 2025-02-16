import { EditQuoteLineData } from '../components/EditEquipmentQuoteMaterials';

const getEditEquipmentLineTotal = (quoteLine: EditQuoteLineData): number => {
    const quantity = isNaN(parseInt(quoteLine.quantity)) ? 1 : parseInt(quoteLine.quantity);
    const price = isNaN(parseFloat(quoteLine.price)) ? 0 : parseFloat(quoteLine.price);

    return quantity * price / 60;
}

export default getEditEquipmentLineTotal