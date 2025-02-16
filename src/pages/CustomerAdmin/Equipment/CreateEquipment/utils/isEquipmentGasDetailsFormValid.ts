import { CreateEquipmentAttributes } from './../../../../../types/equipment.types';

const isEquipmentGasDetailsFormValid = (equipmentDetails: CreateEquipmentAttributes): boolean => {

    const gasCouncilNumberEntered = equipmentDetails.gas_council_number.length > 0;

    return (
        gasCouncilNumberEntered 
    )
   
}

export default isEquipmentGasDetailsFormValid