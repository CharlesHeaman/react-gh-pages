
const PurchaseOrderAttachmentLink = (props: {
    attachmentName: string,
    fileName: string,
}) => {
    return (
        <a 
            href={`${process.env.REACT_APP_API_URL}/purchase_order_attachments/${props.fileName}`}
            className="icon-link"
            target="_blank" 
            rel="noopener noreferrer"
        >
            <span className="material-icons">description</span>
            <span>{props.attachmentName}</span>
        </a>
    )
}

export default PurchaseOrderAttachmentLink