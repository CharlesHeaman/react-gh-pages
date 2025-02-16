import { QuotedEquipmentResponseData } from "../../../../types/quotedEquipment.types"
import { QuotedSiteResponseData } from "../../../../types/quotedSites.types"
import getQuoteTravelRowTotalCost from "./getQuoteTravelRowTotalCost"
import isTravelIncluded from "./isTravelIncluded"

const getQuoteTravelTotalCost = (
    equipmentQuoteDetails: QuotedEquipmentResponseData | QuotedSiteResponseData,
): number => {
    return equipmentQuoteDetails.data.visits.reduce((total: number, quoteVisit) => {
        return total + (isTravelIncluded(equipmentQuoteDetails, quoteVisit) ? getQuoteTravelRowTotalCost(equipmentQuoteDetails, quoteVisit) : 0)

    }, 0)
}

export default getQuoteTravelTotalCost