import { Dispatch, SetStateAction, useState } from "react"
import { EquipmentTypeResponseData } from "../../../../types/equipmentType.types";
import DeactivateModule from "../../../../components/ui/DeactivateModule/DeactivateModule";
import DeactivateOverlay from "../../../../components/ui/DeactivateModule/DeactivateOverlay";
import putAPI from "../../../../utils/putAPI";

const EquipmentTypeDeactivate = (props: {
    equipmentTypeID: number,
    reactivate: boolean,
    setEquipmentTypeData: Dispatch<SetStateAction<EquipmentTypeResponseData | undefined>>
}) => {
    const [showDeactivate, setShowDeactivate] = useState(false);
    const [isDeactivating, setIsDeactivating] = useState(false);

    const deactivateEquipmentType = () => {
        putAPI(`equipment_types/${props.equipmentTypeID}/deactivate`, {}, {
            reactivate: props.reactivate
        }, (response: any) => {
            const equipmentTypeData: EquipmentTypeResponseData = response.data;
            props.setEquipmentTypeData(equipmentTypeData);
            setShowDeactivate(false)
        }, setIsDeactivating)
    }

    return (
        <>
            <DeactivateModule
                resourceName='Equipment Type'
                showFunc={() => setShowDeactivate(true)}
                reactivate={props.reactivate}
            />

            <DeactivateOverlay 
                resourceName="Equipment Type"
                reactivate={props.reactivate} 
                show={showDeactivate} 
                hideFunc={() => setShowDeactivate(false)} 
                isSubmitting={isDeactivating} 
                submitFunc={deactivateEquipmentType}/>
        </>

    )
}

export default EquipmentTypeDeactivate