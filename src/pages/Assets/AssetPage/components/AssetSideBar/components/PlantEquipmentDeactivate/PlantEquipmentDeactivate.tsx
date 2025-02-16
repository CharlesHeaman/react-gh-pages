import { Dispatch, SetStateAction, useState } from "react"
import { AssetResponseData } from "../../../../../../../types/asset.types"
import DeactivateModule from "../../../../../../../components/ui/DeactivateModule/DeactivateModule";
import DeactivateOverlay from "../../../../../../../components/ui/DeactivateModule/DeactivateOverlay";
import putAPI from "../../../../../../../utils/putAPI";

const PlantEquipmentDeactivate = (props: {
    plantEquipmentID: number,
    reactivate: boolean,
    isAssigned: boolean,
    setPlantEquipmentData: Dispatch<SetStateAction<AssetResponseData | undefined>>
}) => {
    const [showDeactivate, setShowDeactivate] = useState(false);
    const [isDeactivating, setIsDeactivating] = useState(false);

    const deactivatePlantEquipment = () => {
        putAPI(`assets/${props.plantEquipmentID}/deactivate`, {}, {
            reactivate: props.reactivate
        }, (response: any) => {
            const contactData: AssetResponseData = response.data;
            props.setPlantEquipmentData(contactData);
            setShowDeactivate(false)
        }, setIsDeactivating)
    }

    return (
        <>
            <DeactivateModule
                resourceName='Plant/Tools'
                showFunc={() => setShowDeactivate(true)}
                reactivate={props.reactivate}
            />

            <DeactivateOverlay 
                resourceName="Plant/Tools"
                reactivate={props.reactivate} 
                additionalText={props.isAssigned ? 'This will also unassign the plant/tools from the current user.' : undefined}
                show={showDeactivate} 
                hideFunc={() => setShowDeactivate(false)} 
                isSubmitting={isDeactivating} 
                submitFunc={deactivatePlantEquipment}/>
        </>

    )
}

export default PlantEquipmentDeactivate