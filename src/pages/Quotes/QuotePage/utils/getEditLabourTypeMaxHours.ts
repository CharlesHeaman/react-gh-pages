import { EditQuoteLabour } from "../components/QuotedEquipmentTab"

const getEditLabourTypeMaxHours = (quoteLabour: Array<EditQuoteLabour>, isMate: boolean, isOutOfHours: boolean, isDoubleTime: boolean) => {
    const filtered = quoteLabour.filter(quoteLabour => 
        quoteLabour.is_mate === isMate && 
        quoteLabour.is_out_of_hours === isOutOfHours && 
        quoteLabour.is_double_time === isDoubleTime
    );

    return Math.max(...filtered.map(quoteLabour => parseFloat(quoteLabour.hours)));
}

export default getEditLabourTypeMaxHours