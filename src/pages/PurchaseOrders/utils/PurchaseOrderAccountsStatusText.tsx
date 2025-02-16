import formatDate from "../../../utils/formatDate";

const PurchaseOrderAccountsStatusText = (props: {
    isOutstanding: boolean, 
    hasReceived: boolean,
    sentAt: Date | null,
}) => {
    if (!props.isOutstanding) return <>
        This purchase order has been fully invoice reconciled.
    </>;
    if (props.hasReceived) return <>
        This purchase order has had some items invoice reconciled but some items are still outstanding.
    </>;
    return <>
        This purchase order was sent to the supplier on {props.sentAt ? formatDate(props.sentAt) : 'unknown'} but no items have been invoice reconciled.
    </>;
}

export default PurchaseOrderAccountsStatusText