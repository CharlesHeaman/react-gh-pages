const getIsQuoteLocked = (status: number): boolean => {
    switch (status) {
        case 0:
        case 1:
        case 5:
        case 3:
            return true
        default:
            return false
    }
}

export default getIsQuoteLocked