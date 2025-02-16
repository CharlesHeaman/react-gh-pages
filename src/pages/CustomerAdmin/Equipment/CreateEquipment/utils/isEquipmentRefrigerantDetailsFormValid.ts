import { CreateEquipmentAttributes } from './../../../../../types/equipment.types';

const isEquipmentRefrigerantDetailsFormValid = (equipmentDetails: CreateEquipmentAttributes, refrigerantID: number | undefined): boolean => {

    const refrigerantChargeEntered = parseFloat(equipmentDetails.refrigerant_charge) >= 0;

    return (
        refrigerantID !== undefined &&
        refrigerantChargeEntered
    )
   
}

export default isEquipmentRefrigerantDetailsFormValid