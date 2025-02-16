import { CreateAssetAttributes } from "../../../../types/asset.types";

const isPlantEquipmentDetailsFormValid = (plantEquipmentDetails: CreateAssetAttributes, plantEquipmentTypeID: number | undefined, isEdit?: boolean): boolean => {
    
    const descriptionEntered = plantEquipmentDetails.description.length > 0;
    const modelEntered = plantEquipmentDetails.model_no.length > 0;
    const serialEntered = plantEquipmentDetails.serial_no.length > 0;
    const locationEntered = plantEquipmentDetails.location.length > 0;
   
    return (
        plantEquipmentTypeID !== undefined &&
        descriptionEntered &&
        modelEntered &&
        serialEntered && 
        (locationEntered || (isEdit !== undefined && isEdit))
    )
   
}

export default isPlantEquipmentDetailsFormValid