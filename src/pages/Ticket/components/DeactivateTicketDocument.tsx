import { useState } from "react";
import DeactivateOverlay from "../../../components/ui/DeactivateModule/DeactivateOverlay";
import { TicketUploadResponseData } from "../../../types/ticketUploads.types";
import putAPI from "../../../utils/putAPI";

const DeactivateTicketDocument = (props: {
    document: TicketUploadResponseData | undefined,
    getDocuments: () => void,
    show: boolean,
    hideFunc: () => void
}) => {
    
    const [isDeactivating, setIsDeactivating] = useState(false);

    const deleteDocument = () => {
        putAPI(`ticket_uploads/${props.document?.id}/deactivate`, {}, {}, () => {
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

export default DeactivateTicketDocument