import { useEffect, useState } from "react";
import { ScheduleOfWorksResponseData } from "../../../types/scheduleOfWorks.types";
import putAPI from "../../../utils/putAPI";
import RenameDocumentOverlay from "../../SuppliersManufacturers/SupplierManufacturerPage/components/RenameDocumentOverlay";

const RenameScheduleOfWorksDocument = (props: {
    document: ScheduleOfWorksResponseData | undefined,
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
        putAPI(`schedule_of_works/${props.document?.id}/rename`, {}, {
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

export default RenameScheduleOfWorksDocument