import { QuotedEquipmentResponseData } from "../../../../types/quotedEquipment.types";
import { QuotedSiteResponseData } from "../../../../types/quotedSites.types";
import getLabourTypeMaxHours from "./getLabourTypeMaxHours";

const getQuotedEquipmentMaxHours = (
    equipmentQuoteDetails: QuotedEquipmentResponseData | QuotedSiteResponseData,
): number => {
    const maxHours = getLabourTypeMaxHours(equipmentQuoteDetails.data.labour, false, false, false);
    const maxOutOfHours = getLabourTypeMaxHours(equipmentQuoteDetails.data.labour, false, true, false);
    const maxDoubleHours = getLabourTypeMaxHours(equipmentQuoteDetails.data.labour, false, false, true);
    
    return maxHours + maxOutOfHours + maxDoubleHours
}

export default getQuotedEquipmentMaxHours