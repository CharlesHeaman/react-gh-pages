import { PlantEquipmentTypeResponseData } from "../types/plantEquipmentTypes.types"

const findPlantEquipmentType = (plantEquipmentTypes: Array<PlantEquipmentTypeResponseData>, plantEquipmentTypeID: number) => {
    return plantEquipmentTypes.find(plantEquipment => plantEquipment.id === plantEquipmentTypeID)
}

export default findPlantEquipmentType