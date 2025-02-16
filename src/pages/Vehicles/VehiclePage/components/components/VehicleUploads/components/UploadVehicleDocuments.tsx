import { ChangeEvent, useEffect, useState } from "react";
import SubmitButton from "../../../../../../../components/form/SubmitButton/SubmitButton";
import WindowOverlay from "../../../../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import { CreateVehicleDocumentAttributes } from "../../../../../../../types/vehicleDocuments.types";
import postFileAPI from "../../../../../../../utils/postFileAPI";
import updateStateParams from "../../../../../../../utils/updateStateParams/updateStateParams";
import CreateVehicleDocumentForm from "./CreateVehicleDocumentForm";

const UploadVehicleDocuments = (props: {
    vehicleID: number,
    show: boolean,
    hideFunc: () => void,
    getDocuments: (vehicleID: number) => void
}) => {

    // Form States
    const [isCreating, setIsCreating] = useState(false);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [createDocumentAttributes, setCreateDocumentAttributes] = useState<CreateVehicleDocumentAttributes>({
        name: '',
    });
    const [documentType, setDocumentType] = useState<number>(0);
    const [uploadData, setUploadData] = useState<FileList>();

    useEffect(() => {
        if (uploadData === undefined) return;
        const fileName = uploadData[0].name;
        setCreateDocumentAttributes(prevState => {
            return {
                ...prevState,
                name: fileName.split('.')[0]
            }
        })
    }, [uploadData]);

    const updateParams = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => {
        updateStateParams(event, setCreateDocumentAttributes)
    }

    const isFormComplete = (
        uploadData !== undefined && 
        createDocumentAttributes.name.length > 0
    )

    const uploadDocument = () => {
        setHasSubmitted(true);
        if (!isFormComplete) return;
        const formData = new FormData() 
        uploadData && formData.append('upload', uploadData[0]);
        const json = JSON.stringify({
            ...createDocumentAttributes,
            vehicle_id: props.vehicleID,
            type: documentType,
        });
        const blob = new Blob([json], {
            type: 'application/json'
        });
        formData.append('document', blob);
        postFileAPI('vehicle_documents/create', {}, formData, () => {
            props.getDocuments(props.vehicleID);
            props.hideFunc();
            setCreateDocumentAttributes({
                name: '',
            })
            setDocumentType(0);
            setUploadData(undefined);
        }, setIsCreating)
    }

    return (
        <WindowOverlay
            title={"Upload Vehicle Document"} 
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
            <CreateVehicleDocumentForm
                documentAttributes={createDocumentAttributes}
                setUploadData={setUploadData}
                documentType={documentType}
                setDocumentType={setDocumentType}
                updateParams={updateParams}
                showErrors={hasSubmitted}
            />
            
        </WindowOverlay>
    )
}

export default UploadVehicleDocuments