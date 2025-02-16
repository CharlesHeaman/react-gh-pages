
const getPurchaseOrderStatusColor = (isOutstanding: boolean, hasReceived: boolean): string => {
    if (!isOutstanding) return "purple";
    if (hasReceived) return "dark-purple";
    return "light-blue";
}

export default getPurchaseOrderStatusColor