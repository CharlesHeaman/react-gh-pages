import { CreateEquipmentCollectionAttributes } from "../../../../types/equipment.types";

const reduceEquipmentEquipmentTypeQuantity = (createEquipmentAttributes: Array<CreateEquipmentCollectionAttributes>): number => {
    return createEquipmentAttributes.reduce((totalQuantity, currentEquipment) => totalQuantity + (!isNaN(parseInt(currentEquipment.quantity)) ? parseInt(currentEquipment.quantity) : 0), 0);
}

export default reduceEquipmentEquipmentTypeQuantity;