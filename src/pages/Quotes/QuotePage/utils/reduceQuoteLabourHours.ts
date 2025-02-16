import { QuotedEquipmentResponseData } from "../../../../types/quotedEquipment.types";
import { QuotedSiteResponseData } from "../../../../types/quotedSites.types";
import isLabourIncluded from "./isLabourIncluded";

const reduceQuoteLabourHours = (equipmentQuoteDetails: QuotedEquipmentResponseData | QuotedSiteResponseData) => {
    return equipmentQuoteDetails.data.labour.reduce((hours: number, quoteLabour) => {
        return hours + (isLabourIncluded(equipmentQuoteDetails, quoteLabour) ? quoteLabour.hours : 0)
    }, 0)
}

export default reduceQuoteLabourHours