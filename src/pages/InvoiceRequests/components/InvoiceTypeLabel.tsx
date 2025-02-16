import Label from "../../../components/ui/General/Label/Label"
import { InvoiceTypeResponseData } from "../../../types/invoiceTypes.types"

const InvoiceTypeLabel = (props: {
    invoiceType: InvoiceTypeResponseData, 
    isQuoted?: boolean
}) => {
    return (
        !props.isQuoted ? 
            <Label iconFont="credit_card" text={props.invoiceType.data.name} color="grey"/> :
            <Label iconFont="request_quote" text='Quoted' color="purple"/>
    )
}

export default InvoiceTypeLabel