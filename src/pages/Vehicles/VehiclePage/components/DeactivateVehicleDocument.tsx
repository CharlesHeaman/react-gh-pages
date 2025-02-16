import { useState } from "react";
import DeactivateOverlay from "../../../../components/ui/DeactivateModule/DeactivateOverlay";
import { VehicleDocumentsResponseData } from "../../../../types/vehicleDocuments.types";
import putAPI from "../../../../utils/putAPI";

const DeactivateVehicleDocument = (props: {
    document: VehicleDocumentsResponseData | undefined,
    getDocuments: () => void,
    show: boolean,
    hideFunc: () => void
}) => {
    
    const [isDeactivating, setIsDeactivating] = useState(false);

    const deleteDocument = () => {
        putAPI(`vehicle_documents/${props.document?.id}/deactivate`, {}, {}, () => {
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

export default DeactivateVehicleDocument