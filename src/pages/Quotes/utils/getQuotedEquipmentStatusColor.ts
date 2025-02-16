const getQuotedEquipmentStatusColor = (status: number): string => {
    switch (status) {
        case 1:
            return "purple"
        case 2:
            return "dark-blue"
        default:
            return "light-blue"
    }
}

export default getQuotedEquipmentStatusColor