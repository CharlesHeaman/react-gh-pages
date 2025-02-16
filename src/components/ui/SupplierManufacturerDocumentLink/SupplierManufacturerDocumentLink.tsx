import DisabledLabel from "../DisabledLabel/DisabledLabel"

const SupplierManufacturerDocumentLink = (props: {
    documentName: string,
    fileName: string,
    inactive?: boolean
}) => {
    return (
        <a 
            href={`${process.env.REACT_APP_API_URL}/supplier_manufacturer_documents/${props.fileName}`}
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

export default SupplierManufacturerDocumentLink