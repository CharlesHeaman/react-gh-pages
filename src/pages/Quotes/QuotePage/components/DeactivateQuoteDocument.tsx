import { useState } from "react";
import DeactivateOverlay from "../../../../components/ui/DeactivateModule/DeactivateOverlay";
import { QuoteDocumentsResponseData } from "../../../../types/quoteDocuments.types";
import putAPI from "../../../../utils/putAPI";

const DeactivateQuoteDocument = (props: {
    document: QuoteDocumentsResponseData | undefined,
    getDocuments: () => void,
    show: boolean,
    hideFunc: () => void
}) => {
    
    const [isDeactivating, setIsDeactivating] = useState(false);

    const deleteDocument = () => {
        putAPI(`quote_documents/${props.document?.id}/deactivate`, {}, {}, () => {
            props.getDocuments();
            props.hideFunc();
        }, setIsDeactivating)
    }

    return (
        <DeactivateOverlay 
            resourceName="Document"
            show={props.show} 
            hideFunc={props.hideFunc} 
            isSubmitting={isDeactivating} 
            submitFunc={deleteDocument}
        />
    )
}

export default DeactivateQuoteDocument