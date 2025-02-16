import { EditQuoteVisits } from "../components/QuotedEquipmentTab";

const getEditVisitsMax = (quoteVisits: Array<EditQuoteVisits>) => {
    return Math.max(...quoteVisits.map(quoteVisits => parseInt(quoteVisits.visits)));
}

export default getEditVisitsMax