const getQuoteStatusIcon = (status: number): string => {
    switch (status) {
        case 0:
            return "mark_email_read"
        case 1:
            return "thumb_up"
        case 3:
            return "thumb_down"
        case 5:
            return "check_circle"
        default:
            return "pending"
    }
}

export default getQuoteStatusIcon