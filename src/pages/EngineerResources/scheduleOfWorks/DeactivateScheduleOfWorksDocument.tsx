import { useState } from "react";
import DeactivateOverlay from "../../../components/ui/DeactivateModule/DeactivateOverlay";
import putAPI from "../../../utils/putAPI";
import { ScheduleOfWorksResponseData } from "../../../types/scheduleOfWorks.types";

const DeactivateScheduleOfWorksDocument = (props: {
    document: ScheduleOfWorksResponseData | undefined,
    getDocuments: () => void,
    show: boolean,
    hideFunc: () => void
}) => {
    
    const [isDeactivating, setIsDeactivating] = useState(false);

    const deleteDocument = () => {
        putAPI(`schedule_of_works/${props.document?.id}/deactivate`, {}, {}, () => {
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

export default DeactivateScheduleOfWorksDocument