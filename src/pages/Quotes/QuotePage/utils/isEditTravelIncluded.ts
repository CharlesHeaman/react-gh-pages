import { EditEquipmentQuote, EditQuoteVisits } from "../components/QuotedEquipmentTab"

const isEditTravelIncluded = (equipmentQuoteDetails: EditEquipmentQuote, quoteVisits: EditQuoteVisits) => {
    return (
        (!quoteVisits.is_mate && (!quoteVisits.is_out_of_hours || equipmentQuoteDetails.is_out_of_hours) && (!quoteVisits.is_double_time || equipmentQuoteDetails.is_double_time)) ||
        (quoteVisits.is_mate && (!quoteVisits.is_out_of_hours || equipmentQuoteDetails.is_out_of_hours) && (!quoteVisits.is_double_time || equipmentQuoteDetails.is_double_time))
    )
}

export default isEditTravelIncluded