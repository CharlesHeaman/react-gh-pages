function getTimeGridStatusText(status: number | undefined) {
    switch (status) {
        case 0:
            return 'Submitted'
        case 1:
            return 'Returned'
        case 2:
            return 'Validated'
        case 3:
            return 'Processed'
        default:
            return 'Outstanding'
    }
}

export default getTimeGridStatusText 