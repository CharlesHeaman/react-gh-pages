import { useEffect, useState } from "react";
import { PurchaseOrderAttachmentResponseData } from "../../../types/purchaseOrderAttachments.types";
import putAPI from "../../../utils/putAPI";
import RenameDocumentOverlay from "../../SuppliersManufacturers/SupplierManufacturerPage/components/RenameDocumentOverlay";

const RenamePurchaseOrderAttachment = (props: {
    attachment: PurchaseOrderAttachmentResponseData | undefined,
    getAttachments: () => void,
    show: boolean,
    hideFunc: () => void
}) => {
    
    const [isUpdating, setIsUpdating] = useState(false);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [attachmentName, setAttachmentName] = useState<string>('');

    useEffect(() => {
        if (props.attachment?.data.name === undefined) return;
        setAttachmentName(props.attachment.data.name);
    }, [props.attachment?.data.name])

    const updateAttachment = () => {
        setHasSubmitted(true);
        if (!formComplete) return;
        putAPI(`purchase_order_attachments/${props.attachment?.id}/rename`, {}, {
            name: attachmentName
        }, () => {
            props.getAttachments();
            props.hideFunc();
        }, setIsUpdating)
    }

    const formComplete = attachmentName.length > 0;

    return (
        <RenameDocumentOverlay
            documentName={attachmentName}
            setDocumentName={setAttachmentName}
            submitFunc={updateAttachment}
            isSubmitting={isUpdating}
            formComplete={formComplete}
            show={props.show}
            hasSubmitted={hasSubmitted}
            hideFunc={props.hideFunc}
            isAttachment
        />
    )
}

export default RenamePurchaseOrderAttachment