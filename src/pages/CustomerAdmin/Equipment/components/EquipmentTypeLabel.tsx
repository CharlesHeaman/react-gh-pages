import Label from "../../../../components/ui/General/Label/Label"
import { EquipmentTypeResponseData } from "../../../../types/equipmentType.types"

const EquipmentTypeLabel = (props: {
    equipmentType: EquipmentTypeResponseData | undefined
}) => {
    return (
        <Label 
            text={props.equipmentType ? props.equipmentType.data.name : 'Unknown'}
            iconFont={props.equipmentType ? 'local_laundry_service' : 'help_center'} 
            color={props.equipmentType ? 'purple' : 'no-color'}
        />
    )
}

export default EquipmentTypeLabel