import { EditEquipmentQuote } from "../components/QuotedEquipmentTab";

const getEditQuoteMileageCount = (equipmentQuoteDetails: EditEquipmentQuote): number => {
    const mileage = parseFloat(equipmentQuoteDetails.mileage);
    return !isNaN(mileage) ? mileage : 0
}

export default getEditQuoteMileageCount
