const getQuoteStatusColor = (status: number): string => {
    switch (status) {
        case 0:
            return "orange"
        case 1:
            return "light-green"
        case 3:
            return "red"
        case 5:
            return "dark-blue"
        default:
            return "light-blue"
    }
}

export default getQuoteStatusColor