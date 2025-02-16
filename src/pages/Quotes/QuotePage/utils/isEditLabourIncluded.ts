import { EditEquipmentQuote, EditQuoteLabour } from "../components/QuotedEquipmentTab";
import getQuoteEngineerCount from "./getQuoteEngineerCount";
import getQuoteMateCount from "./getQuoteMateCount";

const isEditLabourIncluded = (equipmentQuoteDetails: EditEquipmentQuote, quoteLabour: EditQuoteLabour): boolean => {
    const engineerCount = getQuoteEngineerCount(equipmentQuoteDetails);
    const mateCount = getQuoteMateCount(equipmentQuoteDetails);

    return (
        ((quoteLabour.engineer_index < engineerCount) && !quoteLabour.is_mate && (!quoteLabour.is_out_of_hours || equipmentQuoteDetails.is_out_of_hours) && (!quoteLabour.is_double_time || equipmentQuoteDetails.is_double_time)) ||
        ((quoteLabour.engineer_index < mateCount) && quoteLabour.is_mate && (!quoteLabour.is_out_of_hours || equipmentQuoteDetails.is_out_of_hours) && (!quoteLabour.is_double_time || equipmentQuoteDetails.is_double_time))
    )
}

export default isEditLabourIncluded