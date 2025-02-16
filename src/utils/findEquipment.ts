import { EquipmentResponseData } from './../types/equipment.types';

const findEquipment = (equipment: Array<EquipmentResponseData>, equipmentID: number) => {
    return equipment.find(equipment => equipment.id === equipmentID)
}

export default findEquipment