import DisabledLabel from "../../../../components/ui/DisabledLabel/DisabledLabel"

const QuoteDocumentLink = (props: {
    documentName: string,
    fileName: string,
    inactive?: boolean

}) => {
    return (
        <a 
            href={`${process.env.REACT_APP_API_URL}/quote_documents/${props.fileName}`}
            className="icon-link"
            target="_blank" 
            rel="noopener noreferrer"
        >
            {!props.inactive ?
                <span className="material-icons">description</span> :
                <DisabledLabel hideText/>
            }  
            <span>{props.documentName}</span>
        </a>
    )
}

export default QuoteDocumentLink