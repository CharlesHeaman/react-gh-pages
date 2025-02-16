
const TicketUploadLink = (props: {
    documentName: string,
    ticketType: number,
    ticketID: number,
    fileName: string,
}) => {
    return (
        <a 
            href={`${process.env.REACT_APP_API_URL}/${props.ticketType}/${props.ticketID}/${props.fileName}`}
            className="icon-link"
            target="_blank" 
            rel="noopener noreferrer"
        >
            <span className="material-icons">description</span>
            <span>{props.documentName}</span>
        </a>
    )
}

export default TicketUploadLink