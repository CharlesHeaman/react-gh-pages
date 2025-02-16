import { EquipmentTypeResponseData } from "../types/equipmentType.types";

const findEquipmentType = (equipmentTypes: Array<EquipmentTypeResponseData>, equipmentTypeID: number): EquipmentTypeResponseData | undefined => {
    return equipmentTypes.find(equipmentType => equipmentType.id === equipmentTypeID)
}

export default findEquipmentType