import NewEquipmentLink from "../../../../components/ui/Links/NewEquipmentLink"
import { EquipmentResponseData } from "../../../../types/equipment.types"

const QuotedEquipmentPreviewRow = (props: {
    equipment: EquipmentResponseData | undefined,
}) => {    
    return (
        <tr>
            <td className="text-left">{props.equipment ? <NewEquipmentLink code={props.equipment.data.code}/> : 'Unknown'}</td>
            <td className="text-left">{props.equipment ? props.equipment.data.location : 'Unknown'}</td>
            <td className="text-left">{props.equipment ? props.equipment.data.description : 'Unknown'}</td>
        </tr>
    )
}

export default QuotedEquipmentPreviewRow