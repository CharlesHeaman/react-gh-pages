import Label from "../../../components/ui/General/Label/Label"
import getPaymentTypeIcon from "../utils/getPaymentTypeIcon"
import getPaymentTypeTitle from "../utils/getPaymentTypeText"

const PurchaseOrderPaymentTypeLabel = (props: {
    paymentType: number
}) => {
    return <Label 
        text={getPaymentTypeTitle(props.paymentType)} 
        color='grey' 
        iconFont={getPaymentTypeIcon(props.paymentType)}
    />
}

export default PurchaseOrderPaymentTypeLabel