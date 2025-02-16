import { useState } from "react";
import { PurchaseOrderAttachmentResponseData } from "../../../types/purchaseOrderAttachments.types";
import DeactivateOverlay from "../../../components/ui/DeactivateModule/DeactivateOverlay";
import putAPI from "../../../utils/putAPI";

const RemovePurchaseOrderAttachment = (props: {
    attachment: PurchaseOrderAttachmentResponseData | undefined,
    getAttachments: () => void,
    show: boolean,
    hideFunc: () => void
}) => {
    
    const [isDeactivating, setIsDeactivating] = useState(false);

    const deleteAttachment = () => {
        putAPI(`purchase_order_attachments/${props.attachment?.id}/deactivate`, {}, {}, () => {
            props.getAttachments();
            props.hideFunc();
        }, setIsDeactivating)
    }

    return (
        <DeactivateOverlay 
            resourceName="Attachment"
            show={props.show} 
            hideFunc={props.hideFunc} 
            isSubmitting={isDeactivating} 
            submitFunc={deleteAttachment}
            actionName="Remove"
            presentParticiple="Removing"
        />
    )
}

export default RemovePurchaseOrderAttachment