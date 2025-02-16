import getJobInvoiceRequestURL from "../../utils/getJobInvoiceRequestURL"

const JobInvoiceRequestLink = (props: {
    id: number,
}) => {
    return (
        <a 
        href={getJobInvoiceRequestURL(props.id)}
        className="icon-link"
    >
        <span className="material-icons">credit_card</span>
        <span>{props.id}</span>
    </a>
    )
}

export default JobInvoiceRequestLink