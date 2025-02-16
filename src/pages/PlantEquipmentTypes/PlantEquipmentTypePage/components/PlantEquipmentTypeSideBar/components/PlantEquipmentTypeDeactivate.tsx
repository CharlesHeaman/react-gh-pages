import { Dispatch, SetStateAction, useState } from "react"
import DeactivateModule from "../../../../../../components/ui/DeactivateModule/DeactivateModule";
import DeactivateOverlay from "../../../../../../components/ui/DeactivateModule/DeactivateOverlay";
import { PlantEquipmentTypeResponseData } from "../../../../../../types/plantEquipmentTypes.types";
import putAPI from "../../../../../../utils/putAPI";

const PlantEquipmentTypeDeactivate = (props: {
    plantEquipmentTypeID: number,
    reactivate: boolean,
    setPlantEquipmentTypeData: Dispatch<SetStateAction<PlantEquipmentTypeResponseData | undefined>>
}) => {
    const [showDeactivate, setShowDeactivate] = useState(false);
    const [isDeactivating, setIsDeactivating] = useState(false);

    const deactivatePlantEquipmentType = () => {
        putAPI(`plant_equipment_types/${props.plantEquipmentTypeID}/deactivate`, {}, {
            reactivate: props.reactivate
        }, (response: any) => {
            const plantEquipmentTypeData: PlantEquipmentTypeResponseData = response.data;
            props.setPlantEquipmentTypeData(plantEquipmentTypeData);
            setShowDeactivate(false)
        }, setIsDeactivating)
    }

    return (
        <>
            <DeactivateModule
                resourceName='Type'
                showFunc={() => setShowDeactivate(true)}
                reactivate={props.reactivate}
            />

            <DeactivateOverlay 
                resourceName="Plant/Tools Type"
                reactivate={props.reactivate} 
                show={showDeactivate} 
                hideFunc={() => setShowDeactivate(false)} 
                isSubmitting={isDeactivating} 
                submitFunc={deactivatePlantEquipmentType}/>
        </>

    )
}

export default PlantEquipmentTypeDeactivate