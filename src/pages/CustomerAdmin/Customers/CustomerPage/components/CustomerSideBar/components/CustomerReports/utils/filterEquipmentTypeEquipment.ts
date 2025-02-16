import { EquipmentResponseData } from "../../../../../../../../../types/equipment.types"

const filterEquipmentTypeEquipment = (equipment: Array<EquipmentResponseData>, equipmentTypeID: number | null) => {
    return equipment.filter(equipment => 
        equipment.data.equipment_type_id === equipmentTypeID
    )
}

export default filterEquipmentTypeEquipment