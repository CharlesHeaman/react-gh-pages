import { EditEquipmentQuote } from "../components/QuotedEquipmentTab";

const getQuoteMateCount = (equipmentQuoteDetails: EditEquipmentQuote): number => {
    const mateCount = parseInt(equipmentQuoteDetails.number_of_mates);
    return !isNaN(mateCount) ? mateCount : 0
}

export default getQuoteMateCount