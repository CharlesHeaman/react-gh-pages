import { EquipmentTypeResponseData } from "../../../types/equipmentType.types"
import EquipmentTypeLabel from "../../CustomerAdmin/Equipment/components/EquipmentTypeLabel"

const EquipmentTypeSummaryRow = (props: {
    equipmentType: EquipmentTypeResponseData | undefined,
    quantity: number,
}) => {
    return (
        props.quantity > 0 ?
            <tr>
                <td className="text-left"><EquipmentTypeLabel equipmentType={props.equipmentType}/></td>
                <td>{props.quantity}</td>
            </tr>
            : 
            null
    )
}

export default EquipmentTypeSummaryRow