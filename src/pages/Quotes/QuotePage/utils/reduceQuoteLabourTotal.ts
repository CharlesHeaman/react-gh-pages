import { QuotedEquipmentResponseData } from "../../../../types/quotedEquipment.types";
import { QuotedSiteResponseData } from "../../../../types/quotedSites.types";
import getQuotedEquipmentLabourRate from "./getDepartmentLabourRate";
import isLabourIncluded from "./isLabourIncluded";

const reduceQuoteLabourTotal = (equipmentQuoteDetails: QuotedEquipmentResponseData | QuotedSiteResponseData) => {
    return equipmentQuoteDetails.data.labour.reduce((total: number, quoteLabour) => {
        return total + (isLabourIncluded(equipmentQuoteDetails, quoteLabour) ? quoteLabour.hours * getQuotedEquipmentLabourRate(equipmentQuoteDetails, quoteLabour.is_mate, quoteLabour.is_out_of_hours, quoteLabour.is_double_time) : 0)
    }, 0)
}

export default reduceQuoteLabourTotal