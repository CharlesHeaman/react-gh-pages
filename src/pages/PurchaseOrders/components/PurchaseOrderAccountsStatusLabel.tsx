import Label from "../../../components/ui/General/Label/Label";
import getPurchaseOrderAccountsStatusColor from "../utils/getPurchaseOrderAccountsStatusColor";
import getPurchaseOrderAccountsStatusIcon from "../utils/getPurchaseOrderAccountsStatusIcon";
import getPurchaseOrderAccountsStatusTitle from "../utils/getPurchaseOrderAccountsStatusTitle";

const PurchaseOrderAccountsStatusLabel = (props: {
    isAccountsOutstanding: boolean,
    hasReconciled: boolean,
}) => {
    return <Label 
        text={getPurchaseOrderAccountsStatusTitle(props.isAccountsOutstanding, props.hasReconciled)} 
        iconFont={getPurchaseOrderAccountsStatusIcon(props.isAccountsOutstanding, props.hasReconciled)} 
        color={getPurchaseOrderAccountsStatusColor(props.isAccountsOutstanding, props.hasReconciled)}
    />;
}

export default PurchaseOrderAccountsStatusLabel