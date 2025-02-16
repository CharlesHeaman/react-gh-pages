import { EditEquipmentQuote } from "../components/QuotedEquipmentTab";

const getEditQuoteEngineerCount = (equipmentQuoteDetails: EditEquipmentQuote): number => {
    const engineerCount = parseInt(equipmentQuoteDetails.number_of_engineers);
    return !isNaN(engineerCount) ? engineerCount : 0
}

export default getEditQuoteEngineerCount