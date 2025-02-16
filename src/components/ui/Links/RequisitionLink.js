function RequisitionLink(props) {
    return (
        <a href={`${process.env.REACT_APP_OLD_SITE_URL}/utils.asp?a=printreq&reqnumber=${props.number}&showprices=1`}>
            {`${props.number}`}
        </a>
    )
}

export default RequisitionLink