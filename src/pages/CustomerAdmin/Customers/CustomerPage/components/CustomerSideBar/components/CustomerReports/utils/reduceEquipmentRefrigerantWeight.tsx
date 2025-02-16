import { EquipmentResponseData } from "../../../../../../../../../types/equipment.types"

const reduceEquipmentRefrigerantWeight = (equipment: Array<EquipmentResponseData>) => {
    return equipment.reduce((weight: number, equipment) => {
        return weight + equipment.data.refrigerant_charge
    }, 0)
}

export default reduceEquipmentRefrigerantWeight