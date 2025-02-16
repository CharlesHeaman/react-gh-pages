import { useState } from "react";
import DeactivateOverlay from "../../../../../../../../components/ui/DeactivateModule/DeactivateOverlay";
import { PlantEquipmentDocumentsResponseData } from "../../../../../../../../types/plantEquipmentDocument.types";
import putAPI from "../../../../../../../../utils/putAPI";

const DeactivatePlantEquipmentDocument = (props: {
    document: PlantEquipmentDocumentsResponseData | undefined,
    getDocuments: () => void,
    show: boolean,
    hideFunc: () => void
}) => {
    
    const [isDeactivating, setIsDeactivating] = useState(false);

    const deleteDocument = () => {
        putAPI(`plant_equipment_documents/${props.document?.id}/deactivate`, {}, {}, () => {
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

export default DeactivatePlantEquipmentDocument