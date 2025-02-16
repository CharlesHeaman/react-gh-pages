import { EditQuoteLineData } from '../components/EditEquipmentQuoteMaterials';
import getEditMaterialLineTotal from './getEditMaterialLineTotal';

const reduceEditQuoteMaterialTotal = (quoteLines: Array<EditQuoteLineData>) => {
    return quoteLines.reduce((total: number, quoteLine) => {
        return total + getEditMaterialLineTotal(quoteLine);
    }, 0)
}

export default reduceEditQuoteMaterialTotal