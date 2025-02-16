const getInvoicePeriodIcon = (invoicePeriod: number) : string => {
    switch (invoicePeriod) {
        case 0:
            return 'calendar_today'
        case 1:
            return 'event'
        case 2:
            return 'date_range'
        case 3:
            return 'event_repeat'
        default:
            return 'calendar_month'
    }
}

export default getInvoicePeriodIcon