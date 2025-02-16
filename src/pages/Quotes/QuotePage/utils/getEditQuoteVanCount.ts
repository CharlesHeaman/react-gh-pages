import { EditEquipmentQuote } from "../components/QuotedEquipmentTab";

const getEditQuoteVanCount = (equipmentQuoteDetails: EditEquipmentQuote): number => {
    const vanCount = parseInt(equipmentQuoteDetails.number_of_vans);
    return !isNaN(vanCount) ? vanCount : 0
}

export default getEditQuoteVanCount