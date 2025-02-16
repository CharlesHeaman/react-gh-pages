const getQuotedEquipmentStatusDescription = (status: number, isSite?: boolean): string => {
    switch (status) {
        case 1:
            return `${!isSite ? 'Equipment' : 'Site'} quote was marked as awaiting costs on [date].`
        case 2:
            return `${!isSite ? 'Equipment' : 'Site'} quote was marked as complete on [date].`
        default:
            return `${!isSite ? 'Equipment' : 'Site'} quote was added on [date].`
    }
}

export default getQuotedEquipmentStatusDescription