import { EditEquipmentQuote, EditQuoteVisits } from "../components/QuotedEquipmentTab"
import getEditQuoteTravelRowTotalCost from "./getEditQuoteTravelRowTotalCost"
import isEditTravelIncluded from "./isEditTravelIncluded"

const getEditQuoteTravelTotalCost = (equipmentQuoteDetails: EditEquipmentQuote, quoteVisits: Array<EditQuoteVisits>): number => {
    return quoteVisits.reduce((total: number, quoteVisit) => {
        return total + (isEditTravelIncluded(equipmentQuoteDetails, quoteVisit) ? getEditQuoteTravelRowTotalCost(equipmentQuoteDetails, quoteVisit) : 0)

    }, 0)
}

export default getEditQuoteTravelTotalCost