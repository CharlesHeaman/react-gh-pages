import { EditEquipmentQuote, EditQuoteLabour } from "../components/QuotedEquipmentTab";
import isEditLabourIncluded from "./isEditLabourIncluded";

const reduceEditQuoteLabourHours = (equipmentQuoteDetails: EditEquipmentQuote, quoteLabour: Array<EditQuoteLabour>) => {
    return quoteLabour.reduce((hours: number, quoteLabour) => {
        return hours + (isEditLabourIncluded(equipmentQuoteDetails, quoteLabour) ? parseFloat(quoteLabour.hours) : 0)
    }, 0)
}

export default reduceEditQuoteLabourHours