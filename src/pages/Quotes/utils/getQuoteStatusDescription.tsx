import formatDate from "../../../utils/formatDate"

const getQuoteStatusDescription = (status: number, createdDate: Date): string => {
    switch (status) {
        case 0:
            return 'This quote was sent on [date] but has not yet received a response.'
        case 1:
            return 'This quote was accepted by the customer on [date].'
        case 3:
            return "This quote was declined by the customer on [date]."
        case 5:
            return "This quote was marked as complete on [date]."
        default:
            return `This quote was created on ${formatDate(createdDate)} but has not yet been sent to the customer.`
    }
}

export default getQuoteStatusDescription