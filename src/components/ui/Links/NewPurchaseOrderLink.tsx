import getPurchaseOrderURL from "./utils/getPurchaseOrderURL"

const NewPurchaseOrderLink = (props: {
    purchaseOrderID: number,
}) => {
    return (
        <a 
        href={getPurchaseOrderURL(props.purchaseOrderID)}
            className="icon-link"
        >
            <span className="material-icons">receipt_long</span>
            <span>{props.purchaseOrderID}</span>
        </a>
    )
}

export default NewPurchaseOrderLink