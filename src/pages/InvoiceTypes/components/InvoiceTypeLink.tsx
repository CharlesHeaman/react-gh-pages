import DisabledLabel from "../../../components/ui/DisabledLabel/DisabledLabel"
import getInvoiceTypeURL from "../utils/getInvoiceTypeURL"

const InvoiceTypeLink = (props: {
    invoiceTypeID: number,
    name: string,
    inactive?: boolean,
}) => {
    return (
        <a 
            href={getInvoiceTypeURL(props.invoiceTypeID)}
            className="icon-link"
        >
            {!props.inactive ?
                <span className="material-icons">credit_card</span> :
                <DisabledLabel hideText/>
            }  
            <span>{props.name}</span>
        </a>
    )
}

export default InvoiceTypeLink