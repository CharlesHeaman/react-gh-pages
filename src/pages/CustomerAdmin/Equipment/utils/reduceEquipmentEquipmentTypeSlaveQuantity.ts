import { CreateEquipmentCollectionAttributes } from "../../../../types/equipment.types";

const reduceVariableSlaveQuantity = (variablesSlaves: Array<string>): number => {
    return variablesSlaves.reduce((totalQuantity, currentSlave) => totalQuantity + (!isNaN(parseInt(currentSlave)) ? parseInt(currentSlave) : 0), 0);
}

const reduceEquipmentEquipmentTypeSlaveQuantity = (createEquipmentAttributes: Array<CreateEquipmentCollectionAttributes>): number => {
    return createEquipmentAttributes.reduce((totalQuantity, currentEquipment) => totalQuantity + (
        (currentEquipment.slave_quantity > 0 ? 
            currentEquipment.slave_quantity * (!isNaN(parseInt(currentEquipment.quantity)) ? parseInt(currentEquipment.quantity) : 0) : 
            reduceVariableSlaveQuantity(currentEquipment.variable_slave_quantity))
    ), 0);
}

export default reduceEquipmentEquipmentTypeSlaveQuantity;