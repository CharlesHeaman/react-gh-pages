const getOrderThresholdStatus = (stockLevel: number, orderThreshold: number | null, outstandingQuantity?: number): number | undefined => {
    const stockLevelTotal = stockLevel + (outstandingQuantity ? outstandingQuantity : 0)
    if (orderThreshold === null) return undefined;
    if (stockLevelTotal < orderThreshold) return -1;
    if (stockLevelTotal < orderThreshold + (orderThreshold / 10)) return 0;
    return 1
}

export default getOrderThresholdStatus