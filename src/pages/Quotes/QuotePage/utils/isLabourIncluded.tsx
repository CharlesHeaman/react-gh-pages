import { QuotedEquipmentResponseData } from "../../../../types/quotedEquipment.types";
import { QuotedSiteResponseData, QuoteLabour } from "../../../../types/quotedSites.types";

const isEditLabourIncluded = (equipmentQuoteDetails: QuotedEquipmentResponseData | QuotedSiteResponseData, quoteLabour: QuoteLabour): boolean => {
    const engineerCount = equipmentQuoteDetails.data.number_of_engineers;
    const mateCount = equipmentQuoteDetails.data.number_of_mates;

    return (
        ((quoteLabour.engineer_index < engineerCount) && !quoteLabour.is_mate && (!quoteLabour.is_out_of_hours || equipmentQuoteDetails.data.is_out_of_hours) && (!quoteLabour.is_double_time || equipmentQuoteDetails.data.is_double_time)) ||
        ((quoteLabour.engineer_index < mateCount) && quoteLabour.is_mate && (!quoteLabour.is_out_of_hours || equipmentQuoteDetails.data.is_out_of_hours) && (!quoteLabour.is_double_time || equipmentQuoteDetails.data.is_double_time))
    )
}

export default isEditLabourIncluded