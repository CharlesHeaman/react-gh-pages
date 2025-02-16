const getQuotedEquipmentStatusTitle = (status: number): string => {
    switch (status) {
        case 1:
            return 'Awaiting Costs'
        case 2:
            return 'Costed'
        default:
            return 'Pending'
    }
}

export default getQuotedEquipmentStatusTitle