import { EditQuoteLineData } from '../components/EditEquipmentQuoteMaterials';

const reduceEditQuoteEquipmentQuantity = (quoteLines: Array<EditQuoteLineData>) => {
    return quoteLines.reduce((total: number, quoteLine) => {
        return total + (isNaN(parseInt(quoteLine.quantity)) ? 1 : parseInt(quoteLine.quantity));
    }, 0)
}

export default reduceEditQuoteEquipmentQuantity