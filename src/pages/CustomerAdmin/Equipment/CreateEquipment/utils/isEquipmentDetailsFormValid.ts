import { CreateEquipmentAttributes } from './../../../../../types/equipment.types';
const isEquipmentDetailsFormValid = (equipmentDetails: CreateEquipmentAttributes, codeUnique: boolean, equipmentTypeID: number | undefined): boolean => {
    const codeEntered = equipmentDetails.code.length > 0;
    const locationEntered = equipmentDetails.location.length > 0;
    const descriptionEntered = equipmentDetails.description.length > 0;

    return (
        codeUnique &&
        codeEntered &&
        locationEntered &&
        descriptionEntered && 
        equipmentTypeID !== undefined
    )
   
}

export default isEquipmentDetailsFormValid