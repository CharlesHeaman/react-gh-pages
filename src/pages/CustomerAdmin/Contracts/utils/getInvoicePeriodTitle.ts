const getInvoicePeriodTitle = (invoicePeriod: number) : string => {
    switch (invoicePeriod) {
        case 0:
            return 'Annually'
        case 1:
            return '6 Monthly'
        case 2:
            return 'Quarterly'
        case 3:
            return 'After Each Visit'
        default:
            return 'Monthly'
    }
}

export default getInvoicePeriodTitle