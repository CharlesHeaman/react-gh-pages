import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DeactivateModule from "../../../../../../components/ui/DeactivateModule/DeactivateModule";
import DeactivateOverlay from "../../../../../../components/ui/DeactivateModule/DeactivateOverlay";
import deleteAPI from "../../../../../../utils/deleteAPI";

const DeleteTicketInvoiceRequest = (props: {
    ticketInvoiceRequestID: number,
}) => {
    const navigate = useNavigate();
    
    const [showDeactivate, setShowDeactivate] = useState(false);
    const [isDeactivating, setIsDeactivating] = useState(false);

    const deleteVehicle = () => {
        deleteAPI(`ticket_invoice_requests/${props.ticketInvoiceRequestID}/delete`, {}, () => {
            navigate('../', { replace: true })
        }, setIsDeactivating)
    }

    return (
        <>
            <DeactivateModule
                resourceName='Ticket Invoice Request'
                showFunc={() => setShowDeactivate(true)}
                delete
            />

            <DeactivateOverlay 
                resourceName="Ticket Invoice Request"
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

export default DeleteTicketInvoiceRequest