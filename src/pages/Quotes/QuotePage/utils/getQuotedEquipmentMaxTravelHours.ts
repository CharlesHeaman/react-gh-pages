import { QuotedEquipmentResponseData } from "../../../../types/quotedEquipment.types";
import { QuotedSiteResponseData } from "../../../../types/quotedSites.types";
import getVisitsMax from "./getVisitsMax";

const getQuotedEquipmentMaxTravelHours = (
    equipmentQuoteDetails: QuotedEquipmentResponseData | QuotedSiteResponseData,
): number => {
    return equipmentQuoteDetails.data.travel_time * getVisitsMax(equipmentQuoteDetails.data.visits);
}

export default getQuotedEquipmentMaxTravelHours