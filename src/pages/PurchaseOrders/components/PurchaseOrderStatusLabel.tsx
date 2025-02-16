import Label from "../../../components/ui/General/Label/Label";
import getPurchaseOrderStatusColor from "../utils/getPurchaseOrderStatusColor";
import getPurchaseOrderStatusIcon from "../utils/getPurchaseOrderStatusIcon";
import getPurchaseOrderStatusTitle from "../utils/getPurchaseOrderStatusTitle";

const PurchaseOrderStatusLabel = (props: {
    isOutstanding: boolean,
    isSent: boolean,
    hasReceived: boolean,
}) => {
    return <Label 
        text={getPurchaseOrderStatusTitle(props.isOutstanding, props.isSent, props.hasReceived)} 
        iconFont={getPurchaseOrderStatusIcon(props.isOutstanding, props.isSent, props.hasReceived)} 
        color={getPurchaseOrderStatusColor(props.isOutstanding, props.isSent, props.hasReceived)}
    />;
}

export default PurchaseOrderStatusLabel