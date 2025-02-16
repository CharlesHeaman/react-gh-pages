import getRequisitionURL from "../utils/getRequisitionURL"

const RequisitionLink = (props: {
    requisitionNumber: number,
}) => {
    return (
        <a 
            href={getRequisitionURL(props.requisitionNumber)}
            className="icon-link"
        >
            <span className="material-icons">all_inbox</span>
            <span>{props.requisitionNumber}</span>
        </a>
    )
}

export default RequisitionLink