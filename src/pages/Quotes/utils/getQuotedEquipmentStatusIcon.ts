const getQuotedEquipmentStatusIcon = (status: number): string => {
    switch (status) {
        case 1:
            return "request_quote"
        case 2:
            return "check_circle"
        default:
            return "pending"
    }
}

export default getQuotedEquipmentStatusIcon