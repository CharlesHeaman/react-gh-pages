const getOrderThresholdTitle = (orderThresholdStatus: number | undefined): string => {
    switch (orderThresholdStatus) {
        case -1:
            return 'Order Required'
        case 0:
            return 'Order Required Soon'
        default:
            return 'Stock Level Good'
    }
}

export default getOrderThresholdTitle