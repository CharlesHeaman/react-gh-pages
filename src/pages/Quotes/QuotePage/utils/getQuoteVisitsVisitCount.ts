const getQuoteVisitsVisitCount = (visits: string): number => {
    const parsedVisits = parseInt(visits);
    return !isNaN(parsedVisits) ? parsedVisits : 0
}

export default getQuoteVisitsVisitCount