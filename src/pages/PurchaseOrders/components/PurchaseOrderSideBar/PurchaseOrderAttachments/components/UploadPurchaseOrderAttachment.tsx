import { useEffect, useState } from "react";
import SubmitButton from "../../../../../../components/form/SubmitButton/SubmitButton";
import WindowOverlay from "../../../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import postFileAPI from "../../../../../../utils/postFileAPI";
import CreatePurchaseOrderAttachmentForm from "./CreatePurchaseOrderAttachmentForm";


const UploadPurchaseOrderAttachments = (props: {
    purchaseOrderID: number,
    show: boolean,
    hideFunc: () => void,
    getAttachments: (customerID: number) => void
}) => {

    // Form States
    const [isCreating, setIsCreating] = useState(false);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [attachmentName, setAttachmentName] = useState<string>('');
    const [uploadData, setUploadData] = useState<FileList>();

    const isFormComplete = (
        uploadData !== undefined && 
        setAttachmentName.name.length > 0
    )

    useEffect(() => {
        if (uploadData === undefined) return;
        const fileName = uploadData[0].name;
        setAttachmentName(fileName.split('.')[0])
    }, [uploadData]);

    const uploadAttachment = () => {
        setHasSubmitted(true);
        if (!isFormComplete) return;
        const formData = new FormData() 
        uploadData && formData.append('upload', uploadData[0]);
        const json = JSON.stringify({
            name: attachmentName,
            purchase_order_id: props.purchaseOrderID,
        });
        const blob = new Blob([json], {
            type: 'application/json'
        });
        formData.append('document', blob);
        postFileAPI('purchase_order_attachments/create', {}, formData, () => {
            props.getAttachments(props.purchaseOrderID);
            props.hideFunc();
            setAttachmentName('')
            setUploadData(undefined);
        }, setIsCreating)
    }

    return (
        <WindowOverlay
            title={"Upload Purchase Order Attachment"}
            maxWidth={300}
            hideFunc={props.hideFunc}
            show={props.show}
            footer={<SubmitButton
                text="Upload Attachment"
                color="dark-blue"
                iconFont="attach_email"
                disabled={hasSubmitted && !isFormComplete}
                submitting={isCreating}
                submittingText="Uploading..."
                clickFunc={uploadAttachment} 
            />} 
        >
            <CreatePurchaseOrderAttachmentForm
                name={attachmentName}
                setName={setAttachmentName}
                setUploadData={setUploadData}
                showErrors={hasSubmitted}
            />            
        </WindowOverlay>
    )
}

export default UploadPurchaseOrderAttachments