import UserLink from "../../../components/ui/Links/UserLink";
import { UserResponseData } from "../../../types/user.types";
import formatDate from "../../../utils/formatDate";

const PurchaseOrderStatusText = (props: {
    isOutstanding: boolean, 
    isSent: boolean, 
    hasReceived: boolean,
    originator: UserResponseData,
    createdAt: Date,
    sentAt: Date | null,
    receivedAt: Date | undefined,
}) => {
    if (!props.isSent) return <>
        This purchase order has yet to be sent to the supplier. This purchase order was created by <UserLink username={props.originator.data.username} firstName={props.originator.data.first_name} lastName={props.originator.data.last_name}/> on {formatDate(props.createdAt)}.
    </>;
    if (!props.isOutstanding) return <>
        This purchase order was fully received on {props.receivedAt ? formatDate(props.receivedAt) : 'unknown'}. This purchase order was created by <UserLink username={props.originator.data.username} firstName={props.originator.data.first_name} lastName={props.originator.data.last_name}/> on {formatDate(props.createdAt)}.
    </>;
    if (props.hasReceived) return <>
        This purchase order received items on {props.receivedAt ? formatDate(props.receivedAt) : 'unknown'} but some items are still outstanding. This purchase order was created by <UserLink username={props.originator.data.username} firstName={props.originator.data.first_name} lastName={props.originator.data.last_name}/> on {formatDate(props.createdAt)}.
    </>;
    return <>
        This purchase order was sent to the supplier on {props.sentAt ? formatDate(props.sentAt) : 'unknown'} but no items have been received. This purchase order was created by <UserLink username={props.originator.data.username} firstName={props.originator.data.first_name} lastName={props.originator.data.last_name}/> on {formatDate(props.createdAt)}.
    </>;
}

export default PurchaseOrderStatusText