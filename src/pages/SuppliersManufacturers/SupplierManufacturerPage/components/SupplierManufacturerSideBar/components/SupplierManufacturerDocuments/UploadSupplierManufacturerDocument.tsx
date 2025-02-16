import { ChangeEvent, useEffect, useState } from "react";
import SubmitButton from "../../../../../../../components/form/SubmitButton/SubmitButton";
import WindowOverlay from "../../../../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import { CreateSupplierManufacturerDocumentAttributes } from "../../../../../../../types/supplierManufacturerDocuments.types";
import getYearRelativeDate from "../../../../../../../utils/getYearRelativeDate";
import postFileAPI from "../../../../../../../utils/postFileAPI";
import updateStateDateParams from "../../../../../../../utils/updateStateParams/updateStateDateParams";
import updateStateParams from "../../../../../../../utils/updateStateParams/updateStateParams";
import CreateSupplierManufacturerDocumentForm from "./CreateSupplierManufacturerDocumentForm";

const UploadSupplierManufacturerDocuments = (props: {
    supplierID: number,
    show: boolean,
    hideFunc: () => void,
    getDocuments: (supplierID: number) => void
}) => {

    // Form States
    const [isCreating, setIsCreating] = useState(false);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [createDocumentAttributes, setCreateDocumentAttributes] = useState<CreateSupplierManufacturerDocumentAttributes>({
        name: '',
        valid_from: new Date(),
    });
    const [documentType, setDocumentType] = useState<number>(1);
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

    const updateDateParams = (date: Date, name: string) => {
        updateStateDateParams(date, name, setCreateDocumentAttributes)
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
            supplier_id: props.supplierID,
            valid_to: getYearRelativeDate(createDocumentAttributes.valid_from, 1),
            type: documentType,
        });
        const blob = new Blob([json], {
            type: 'application/json'
        });
        formData.append('document', blob);
        postFileAPI('supplier_manufacturer_documents/create', {}, formData, () => {
            props.getDocuments(props.supplierID);
            props.hideFunc();
            setCreateDocumentAttributes({
                name: '',
                valid_from: new Date(),
            })
            setDocumentType(1);
            setUploadData(undefined);
        }, setIsCreating)
    }

    return (
        <WindowOverlay
            title={"Upload Supplier/Manufacturer Document"} 
            maxWidth={400} 
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
            <CreateSupplierManufacturerDocumentForm
                documentAttributes={createDocumentAttributes}
                setUploadData={setUploadData}
                documentType={documentType}
                setDocumentType={setDocumentType}
                updateParams={updateParams}
                updateDateParams={updateDateParams}
                showErrors={hasSubmitted}
            />
            
        </WindowOverlay>
    )
}

export default UploadSupplierManufacturerDocuments