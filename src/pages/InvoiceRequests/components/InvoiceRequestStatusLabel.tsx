import Label from "../../../components/ui/General/Label/Label"
import getInvoiceRequestStatusColor from "../utils/getInvoiceRequestStatusColor"
import getInvoiceRequestStatusIcon from "../utils/getInvoiceRequestStatusIcon"
import getInvoiceRequestStatusTitle from "../utils/getInvoiceRequestStatusTitle"

const InvoiceRequestStatusLabel = (props: {
    isProcessed: boolean,
    isHolding: boolean,
    isApproved: boolean
}) => {
    return <Label 
        text={getInvoiceRequestStatusTitle(props.isProcessed, props.isHolding, props.isApproved)}
        iconFont={getInvoiceRequestStatusIcon(props.isProcessed, props.isHolding, props.isApproved)}
        color={getInvoiceRequestStatusColor(props.isProcessed, props.isHolding, props.isApproved)} 
    />;
}

export default InvoiceRequestStatusLabel