import { EditQuoteLineData } from '../components/EditEquipmentQuoteMaterials';
import getEditEquipmentLineTotal from './getEditEquipmentLineTotal';

const reduceEditQuoteEquipmentTotal = (quoteLines: Array<EditQuoteLineData>) => {
    return quoteLines.reduce((total: number, quoteLine) => {
        return total + getEditEquipmentLineTotal(quoteLine);
    }, 0)
}

export default reduceEditQuoteEquipmentTotal