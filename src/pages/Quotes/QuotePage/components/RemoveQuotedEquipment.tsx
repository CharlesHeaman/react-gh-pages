import { useState } from "react";
import DeactivateModule from "../../../../components/ui/DeactivateModule/DeactivateModule";
import DeactivateOverlay from "../../../../components/ui/DeactivateModule/DeactivateOverlay";
import deleteAPI from "../../../../utils/deleteAPI";
import { useSearchParams } from "react-router-dom";

const RemoveQuotedEquipment = (props: {
    quotedEquipmentID: number,
    getQuotedEquipment: () => void,
}) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [showDeactivate, setShowDeactivate] = useState(false);
    const [isDeactivating, setIsDeactivating] = useState(false);

    const deactivateQuotedEquipment = () => {
        deleteAPI(`quoted_equipment/${props.quotedEquipmentID}/delete`, {}, () => {
            removeParam();
            setShowDeactivate(false);
            props.getQuotedEquipment();
        }, setIsDeactivating);
    }

    const removeParam = () => {
        searchParams.delete('quoted_equipment_id');
        setSearchParams(searchParams);
    } 

    return (
        <>
            <DeactivateModule
                resourceName='Quoted Equipment'
                showFunc={() => setShowDeactivate(true)}
                actionName="Remove"
                reactivate={false}
            />

            <DeactivateOverlay 
                resourceName="Quoted Equipment"
                show={showDeactivate} 
                additionalText="This cannot be undone."
                hideFunc={() => setShowDeactivate(false)} 
                actionName="Remove"
                isSubmitting={isDeactivating} 
                submitFunc={deactivateQuotedEquipment}/>
        </>

    )
}

export default RemoveQuotedEquipment