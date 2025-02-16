import { EditEquipmentQuote } from "../components/QuotedEquipmentTab";

const getQuoteTravelTime = (equipmentQuoteDetails: EditEquipmentQuote): number => {
    const travelTime = parseFloat(equipmentQuoteDetails.travel_time);
    return !isNaN(travelTime) ? travelTime : 0
}

export default getQuoteTravelTime