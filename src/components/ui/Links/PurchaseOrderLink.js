function PurchaseOrderLink(props) {
    return (
        <a href={`${process.env.REACT_APP_OLD_SITE_URL}/utils.asp?a=printpo&poid=${props.number}`}>
            {`${props.number}`}
        </a>
    )
}

export default PurchaseOrderLink