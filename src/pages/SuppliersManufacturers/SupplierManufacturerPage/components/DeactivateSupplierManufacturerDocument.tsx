import { useState } from "react";
import DeactivateOverlay from "../../../../components/ui/DeactivateModule/DeactivateOverlay";
import { SupplierManufacturerDocumentsResponseData } from "../../../../types/supplierManufacturerDocuments.types";
import putAPI from "../../../../utils/putAPI";

const DeactivateSupplierManufacturerDocument = (props: {
    document: SupplierManufacturerDocumentsResponseData | undefined,
    getDocuments: () => void,
    show: boolean,
    hideFunc: () => void
}) => {
    
    const [isDeactivating, setIsDeactivating] = useState(false);

    const deleteDocument = () => {
        putAPI(`supplier_manufacturer_documents/${props.document?.id}/deactivate`, {}, {}, () => {
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

export default DeactivateSupplierManufacturerDocument