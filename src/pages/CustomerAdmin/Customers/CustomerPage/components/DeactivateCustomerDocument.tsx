import { useState } from "react";
import DeactivateOverlay from "../../../../../components/ui/DeactivateModule/DeactivateOverlay";
import { CustomerDocumentsResponseData } from "../../../../../types/customerDocuments.types";
import putAPI from "../../../../../utils/putAPI";

const DeactivateCustomerDocument = (props: {
    document: CustomerDocumentsResponseData | undefined,
    getDocuments: () => void,
    show: boolean,
    hideFunc: () => void
}) => {
    
    const [isDeactivating, setIsDeactivating] = useState(false);

    const deleteDocument = () => {
        putAPI(`customer_documents/${props.document?.id}/deactivate`, {}, {}, () => {
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

export default DeactivateCustomerDocument