import { Dispatch, SetStateAction, useState } from "react"
import DeactivateModule from "../../../../../../components/ui/DeactivateModule/DeactivateModule";
import DeactivateOverlay from "../../../../../../components/ui/DeactivateModule/DeactivateOverlay";
import { VehicleResponseData } from "../../../../../../types/vehicles.types";
import putAPI from "../../../../../../utils/putAPI";

const VehicleDeactivate = (props: {
    vehicleID: number,
    reactivate: boolean,
    isAssigned: boolean,
    setVehicleData: Dispatch<SetStateAction<VehicleResponseData | undefined>>
}) => {
    const [showDeactivate, setShowDeactivate] = useState(false);
    const [isDeactivating, setIsDeactivating] = useState(false);

    const deactivateVehicle = () => {
        putAPI(`vehicles/${props.vehicleID}/deactivate`, {}, {
            reactivate: props.reactivate,
        }, (response: any) => {
            const contactData: VehicleResponseData = response.data;
            props.setVehicleData(contactData);
            setShowDeactivate(false)
        }, setIsDeactivating)
    }

    return (
        <>
            <DeactivateModule
                resourceName='Vehicle'
                showFunc={() => setShowDeactivate(true)}
                reactivate={props.reactivate}
            />

            <DeactivateOverlay 
                resourceName="Vehicle"
                reactivate={props.reactivate} 
                additionalText={props.isAssigned ? 'This will also unassign the vehicle from the current user.' : undefined}
                show={showDeactivate} 
                hideFunc={() => setShowDeactivate(false)} 
                isSubmitting={isDeactivating} 
                submitFunc={deactivateVehicle}/>
        </>

    )
}

export default VehicleDeactivate