import { QuoteVisits } from "../../../../types/quotedSites.types";

const getVisitsMax = (quoteVisits: Array<QuoteVisits>) => {
    return Math.max(...quoteVisits.map(quoteVisits => quoteVisits.visits));
}

export default getVisitsMax