import { useEffect, useState } from "react";
import SubmitButton from "../../../../components/form/SubmitButton/SubmitButton";
import TextInput from "../../../../components/form/TextInput/TextInput";
import GridItem from "../../../../components/ui/Containers/GridItem/GridItem";
import InfoGrid from "../../../../components/ui/Containers/InfoGrid/InfoGrid";
import WindowOverlay from "../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import { SupplierManufacturerDocumentsResponseData } from "../../../../types/supplierManufacturerDocuments.types";
import putAPI from "../../../../utils/putAPI";
import RenameDocumentOverlay from "./RenameDocumentOverlay";

const RenameSupplierManufacturerDocument = (props: {
    document: SupplierManufacturerDocumentsResponseData | undefined,
    getDocuments: () => void,
    show: boolean,
    hideFunc: () => void
}) => {
    
    const [isUpdating, setIsUpdating] = useState(false);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [documentName, setDocumentName] = useState<string>('');

    useEffect(() => {
        if (props.document?.data.name === undefined) return;
        setDocumentName(props.document.data.name);
    }, [props.document?.data.name])

    const updateDocument = () => {
        setHasSubmitted(true);
        if (!formComplete) return;
        putAPI(`supplier_manufacturer_documents/${props.document?.id}/rename`, {}, {
            name: documentName
        }, () => {
            props.getDocuments();
            props.hideFunc();
        }, setIsUpdating)
    }

    const formComplete = documentName.length > 0;

    return (
        <RenameDocumentOverlay
            documentName={documentName}
            setDocumentName={setDocumentName}
            submitFunc={updateDocument}
            isSubmitting={isUpdating}
            formComplete={formComplete}
            show={props.show}
            hasSubmitted={hasSubmitted}
            hideFunc={props.hideFunc}
        />
    )
}

export default RenameSupplierManufacturerDocument