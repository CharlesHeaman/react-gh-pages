import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DeactivateModule from "../../../components/ui/DeactivateModule/DeactivateModule";
import DeactivateOverlay from "../../../components/ui/DeactivateModule/DeactivateOverlay";
import deleteAPI from "../../../utils/deleteAPI";

const OnCallEmployeeDeactivate = (props: {
    onCallEngineerID: number,
}) => {
    const navigate = useNavigate();

    const [showDeactivate, setShowDeactivate] = useState(false);
    const [isDeactivating, setIsDeactivating] = useState(false);

    const deactivateOnCallEmployee = () => {
        deleteAPI(`on_call_engineers/${props.onCallEngineerID}/delete`, {}, () => {
            navigate(-1);
        }, setIsDeactivating)

    }

    return (
        <>
            <DeactivateModule
                resourceName='On-call Employee'
                delete
                showFunc={() => setShowDeactivate(true)}
            />

            <DeactivateOverlay 
                resourceName="On-call Employee"
                show={showDeactivate} 
                actionName="Delete"
                hideFunc={() => setShowDeactivate(false)} 
                isSubmitting={isDeactivating} 
                submitFunc={deactivateOnCallEmployee}/>
        </>

    )
}

export default OnCallEmployeeDeactivate