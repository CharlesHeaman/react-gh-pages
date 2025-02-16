import { EditEquipmentQuote, EditQuoteLabour } from "../components/QuotedEquipmentTab";
import isEditLabourIncluded from "./isEditLabourIncluded";

const reduceEditQuoteLabourTotal = (equipmentQuoteDetails: EditEquipmentQuote, quoteLabour: Array<EditQuoteLabour>) => {
    return quoteLabour.reduce((total: number, quoteLabour) => {
        return total + (isEditLabourIncluded(equipmentQuoteDetails, quoteLabour) ? parseFloat(quoteLabour.hours) * quoteLabour.rate : 0)
    }, 0)
}

export default reduceEditQuoteLabourTotal