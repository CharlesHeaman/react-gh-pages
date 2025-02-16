import { useEffect, useState } from "react";
import SubmitButton from "../../../../components/form/SubmitButton/SubmitButton";
import WindowOverlay from "../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import postFileAPI from "../../../../utils/postFileAPI";
import CreateDocumentForm from "../../../CustomerAdmin/Customers/CustomerPage/components/CustomerSideBar/CustomerUploads/components/CreateDocumentForm";

const UploadQuoteDocuments = (props: {
    quoteID: number,
    show: boolean,
    hideFunc: () => void,
    getDocuments: (quoteID: number) => void
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
            quote_id: props.quoteID,
        });
        const blob = new Blob([json], {
            type: 'application/json'
        });
        formData.append('document', blob);
        postFileAPI('quote_documents/create', {}, formData, () => {
            props.getDocuments(props.quoteID);
            props.hideFunc();
            setDocumentName('')
            setUploadData(undefined);
        }, setIsCreating)
    }

    return (
        <WindowOverlay
            title={"Upload Quote Document"}
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

export default UploadQuoteDocuments