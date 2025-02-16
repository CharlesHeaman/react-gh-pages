import Label from "../../../../components/ui/General/Label/Label"
import getInvoicePeriodIcon from "../utils/getInvoicePeriodIcon"
import getInvoicePeriodTitle from "../utils/getInvoicePeriodTitle"

const InvoicePeriodLabel = (props: {
    invoicePeriod: number
}) => {
    return <Label text={getInvoicePeriodTitle(props.invoicePeriod)} color="no-color" iconFont={getInvoicePeriodIcon(props.invoicePeriod)}/>     
}

export default InvoicePeriodLabel