
const getPurchaseOrderStatusTitle = (isOutstanding: boolean, isSent: boolean, hasReceived: boolean): string => {
    if (!isSent) return "Unsent";
    if (!isOutstanding) return "Received";
    if (hasReceived) return "Part Received";
    return "Sent";
}

export default getPurchaseOrderStatusTitle