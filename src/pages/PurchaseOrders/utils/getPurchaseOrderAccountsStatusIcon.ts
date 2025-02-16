
const getPurchaseOrderStatusIcon = (isOutstanding: boolean, hasReceived: boolean): string => {
    if (!isOutstanding) return "balance";
    if (hasReceived) return "rule";
    return "pending";
}

export default getPurchaseOrderStatusIcon