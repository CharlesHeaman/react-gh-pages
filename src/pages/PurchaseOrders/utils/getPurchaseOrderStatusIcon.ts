
const getPurchaseOrderStatusIcon = (isOutstanding: boolean, isSent: boolean, hasReceived: boolean): string => {
    if (!isSent) return "mark_email_unread";
    if (!isOutstanding) return "fact_check";
    if (hasReceived) return "rule";
    return "mark_email_read";
}

export default getPurchaseOrderStatusIcon