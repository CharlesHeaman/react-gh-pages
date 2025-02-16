import { QuoteLabour } from "../../../../types/quotedEquipment.types"

const getQuotedEquipmentTotalHours = (quoteLabour: Array<QuoteLabour>): number => {
    const isIncluded = (quoteLabour: QuoteLabour) => {
        return !quoteLabour.is_mate && quoteLabour.engineer_index === 0
    }
    
    return quoteLabour.reduce((totalHours, quoteLabour) => {
        return totalHours + (isIncluded(quoteLabour) ? quoteLabour.hours : 0)
    }, 0)
}

export default getQuotedEquipmentTotalHours