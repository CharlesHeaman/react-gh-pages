import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DeactivateModule from "../../../../../../components/ui/DeactivateModule/DeactivateModule";
import DeactivateOverlay from "../../../../../../components/ui/DeactivateModule/DeactivateOverlay";
import deleteAPI from "../../../../../../utils/deleteAPI";

const DeleteJobInvoiceRequest = (props: {
    jobInvoiceRequestID: number,
}) => {
    const navigate = useNavigate();
    
    const [showDeactivate, setShowDeactivate] = useState(false);
    const [isDeactivating, setIsDeactivating] = useState(false);

    const deleteVehicle = () => {
        deleteAPI(`job_invoice_requests/${props.jobInvoiceRequestID}/delete`, {}, () => {
            navigate('../', { replace: true })
        }, setIsDeactivating)
    }

    return (
        <>
            <DeactivateModule
                resourceName='Job Invoice Request'
                showFunc={() => setShowDeactivate(true)}
                delete
            />

            <DeactivateOverlay 
                resourceName="Job Invoice Request"
                additionalText='This cannot be undone.'
                show={showDeactivate} 
                hideFunc={() => setShowDeactivate(false)} 
                isSubmitting={isDeactivating} 
                submitFunc={deleteVehicle}
                actionName="Delete"
                presentParticiple="Deleting"
            />
        </>

    )
}

export default DeleteJobInvoiceRequest