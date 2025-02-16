import getTicketInvoiceRequestURL from "../../utils/getTicketInvoiceRequestURL"

const TicketInvoiceRequestLink = (props: {
    id: number,
}) => {
    return (
        <a 
        href={getTicketInvoiceRequestURL(props.id)}
        className="icon-link"
    >
        <span className="material-icons">credit_card</span>
        <span>{props.id}</span>
    </a>
    )
}

export default TicketInvoiceRequestLink