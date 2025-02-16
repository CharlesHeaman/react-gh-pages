import { CreateEquipmentAttributes } from './../../../../../types/equipment.types';

const isEquipmentSupplierManufacturerFormValid = (equipmentDetails: CreateEquipmentAttributes): boolean => {
    const modelNumberEntered = equipmentDetails.model_number.length > 0;
    const serialNumberEntered = equipmentDetails.serial_number.length > 0;

    return (
        modelNumberEntered &&
    serialNumberEntered
    )
   
}

export default isEquipmentSupplierManufacturerFormValid