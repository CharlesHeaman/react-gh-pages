import Label from "../../../../components/ui/General/Label/Label"
import getPlantEquipmentDocumentIcon from "../utils/plantEquipmentDocumentIcon"
import getPlantEquipmentDocumentText from "../utils/plantEquipmentDocumentText"

const PlantEquipmentDocumentLabel = (props: {
    type: number
}) => {

    return (
        <Label
            iconFont={getPlantEquipmentDocumentIcon(props.type)}
            text={getPlantEquipmentDocumentText(props.type)}
            color="no-color"
        />
    )
}

export default PlantEquipmentDocumentLabel