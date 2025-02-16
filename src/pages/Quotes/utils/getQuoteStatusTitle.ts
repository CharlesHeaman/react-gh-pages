const getQuoteStatusTitle = (status: number): string => {
    switch (status) {
        case 0:
            return 'Sent'
        case 1:
            return 'Accepted'
        case 3:
            return "Declined"
        case 5:
            return "Complete"
        default:
            return 'Open'
    }
}

export default getQuoteStatusTitle