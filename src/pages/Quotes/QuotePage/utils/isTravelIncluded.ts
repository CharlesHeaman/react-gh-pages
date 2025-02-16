import { QuotedEquipmentResponseData, QuoteVisits } from "../../../../types/quotedEquipment.types"
import { QuotedSiteResponseData } from "../../../../types/quotedSites.types"

const isTravelIncluded = (equipmentQuoteDetails: QuotedEquipmentResponseData | QuotedSiteResponseData, quoteVisits: QuoteVisits) => {
    return (
        (!quoteVisits.is_mate && (!quoteVisits.is_out_of_hours || equipmentQuoteDetails.data.is_out_of_hours) && (!quoteVisits.is_double_time || equipmentQuoteDetails.data.is_double_time)) ||
        (quoteVisits.is_mate && (!quoteVisits.is_out_of_hours || equipmentQuoteDetails.data.is_out_of_hours) && (!quoteVisits.is_double_time || equipmentQuoteDetails.data.is_double_time))
    )
}

export default isTravelIncluded