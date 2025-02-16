
const getPurchaseOrderStatusTitle = (isOutstanding: boolean, hasReconciled: boolean): string => {
    if (!isOutstanding) return "Invoice Reconciled";
    if (hasReconciled) return "Part Invoice Reconciled";
    return "Not Invoice Reconciled";
}

export default getPurchaseOrderStatusTitle