import DisabledLabel from "../../../components/ui/DisabledLabel/DisabledLabel"

const ManualsDocumentLink = (props: {
    documentName: string,
    fileName: string,
    inactive?: boolean,
}) => {
    return (
        <a 
            href={`${process.env.REACT_APP_API_URL}/${props.fileName}`}
            className="icon-link"
            target="_blank" 
            rel="noopener noreferrer"
        >
            {!props.inactive ?
                <span className="material-icons">find_in_page</span> :
                <DisabledLabel hideText/>
            } 
            <span>{props.documentName}</span>
        </a>
    )
}

export default ManualsDocumentLink