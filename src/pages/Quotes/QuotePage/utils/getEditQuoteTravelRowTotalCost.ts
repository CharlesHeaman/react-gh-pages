import { EditEquipmentQuote, EditQuoteVisits } from "../components/QuotedEquipmentTab"
import getEditQuoteEngineerCount from "./getQuoteEngineerCount"
import getQuoteMateCount from "./getQuoteMateCount"
import getQuoteTravelTime from "./getQuoteTravelTime"
import getQuoteVisitsVisitCount from "./getQuoteVisitsVisitCount"

const getEditQuoteTravelRowTotalCost = (equipmentQuoteDetails: EditEquipmentQuote, quoteVisits: EditQuoteVisits) => {
    
    const travelTime = getQuoteTravelTime(equipmentQuoteDetails);
    const engineerCount = !quoteVisits.is_mate ? getEditQuoteEngineerCount(equipmentQuoteDetails) : getQuoteMateCount(equipmentQuoteDetails);
    const visitCount = getQuoteVisitsVisitCount(quoteVisits.visits);

    return travelTime * quoteVisits.rate * visitCount * engineerCount
}

export default getEditQuoteTravelRowTotalCost