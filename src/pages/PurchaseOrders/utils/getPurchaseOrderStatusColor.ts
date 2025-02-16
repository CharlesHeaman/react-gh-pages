
const getPurchaseOrderStatusColor = (isOutstanding: boolean, isSent: boolean, hasReceived: boolean): string => {
    if (!isSent) return "light-blue";
    if (!isOutstanding) return "dark-blue";
    if (hasReceived) return "dark-purple";
    return "light-green";
}

export default getPurchaseOrderStatusColor