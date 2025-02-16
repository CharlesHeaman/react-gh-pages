import { CreateEquipmentAttributes } from './../../../../../types/equipment.types';

const isEquipmentOilDetailsFormValid = (equipmentDetails: CreateEquipmentAttributes): boolean => {

    const pumpEntered = equipmentDetails.pump.length > 0;
    const nozzleEntered = equipmentDetails.nozzle.length > 0;

    return (
        pumpEntered && 
        nozzleEntered
    )
   
}

export default isEquipmentOilDetailsFormValid