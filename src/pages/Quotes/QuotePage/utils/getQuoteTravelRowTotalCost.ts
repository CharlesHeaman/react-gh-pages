import { QuotedEquipmentResponseData } from "../../../../types/quotedEquipment.types"
import { QuotedSiteResponseData, QuoteVisits } from "../../../../types/quotedSites.types"
import getQuotedEquipmentLabourRate from "./getDepartmentLabourRate"

const getQuoteTravelRowTotalCost = (equipmentQuoteDetails: QuotedEquipmentResponseData | QuotedSiteResponseData, quoteVisits: QuoteVisits) => {
    
    const travelTime = equipmentQuoteDetails.data.travel_time;
    const rate = getQuotedEquipmentLabourRate(equipmentQuoteDetails, quoteVisits.is_mate, quoteVisits.is_out_of_hours, quoteVisits.is_double_time);
    const engineerCount = !quoteVisits.is_mate ? equipmentQuoteDetails.data.number_of_engineers : equipmentQuoteDetails.data.number_of_mates;
    const visitCount = quoteVisits.visits;

    return travelTime * rate * visitCount * engineerCount
}

export default getQuoteTravelRowTotalCost