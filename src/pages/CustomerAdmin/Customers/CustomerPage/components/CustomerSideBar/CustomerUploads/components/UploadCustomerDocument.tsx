import { useEffect, useState } from "react";
import SubmitButton from "../../../../../../../../components/form/SubmitButton/SubmitButton";
import WindowOverlay from "../../../../../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import postFileAPI from "../../../../../../../../utils/postFileAPI";
import CreateDocumentForm from "./CreateDocumentForm";

const UploadCustomerDocuments = (props: {
    customerID: number,
    show: boolean,
    hideFunc: () => void,
    getDocuments: (customerID: number) => void
}) => {

    // Form States
    const [isCreating, setIsCreating] = useState(false);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [documentName, setDocumentName] = useState<string>('');
    const [uploadData, setUploadData] = useState<FileList>();

    useEffect(() => {
        if (uploadData === undefined) return;
        const fileName = uploadData[0].name;
        setDocumentName(fileName.split('.')[0])
    }, [uploadData]);

    const isFormComplete = (
        uploadData !== undefined && 
        setDocumentName.name.length > 0
    )

    const uploadDocument = () => {
        setHasSubmitted(true);
        if (!isFormComplete) return;
        const formData = new FormData() 
        uploadData && formData.append('upload', uploadData[0]);
        const json = JSON.stringify({
            name: documentName,
            customer_id: props.customerID,
        });
        const blob = new Blob([json], {
            type: 'application/json'
        });
        formData.append('document', blob);
        postFileAPI('customer_documents/create', {}, formData, () => {
            props.getDocuments(props.customerID);
            props.hideFunc();
            setDocumentName('')
            setUploadData(undefined);
        }, setIsCreating)
    }

    return (
        <WindowOverlay
            title={"Upload Customer Document"}
            maxWidth={300}
            hideFunc={props.hideFunc}
            show={props.show}
            footer={<SubmitButton
                text="Upload Document"
                color="dark-blue"
                iconFont="upload"
                disabled={hasSubmitted && !isFormComplete}
                submitting={isCreating}
                submittingText="Uploading..."
                clickFunc={uploadDocument} 
            />} 
        >
            <CreateDocumentForm
                name={documentName}
                setName={setDocumentName}
                setUploadData={setUploadData}
                showErrors={hasSubmitted}
            />            
        </WindowOverlay>
    )
}

export default UploadCustomerDocuments