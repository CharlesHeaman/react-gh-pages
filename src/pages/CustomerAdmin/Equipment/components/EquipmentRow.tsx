import NewEquipmentLink from "../../../../components/ui/Links/NewEquipmentLink"
import SiteLink from "../../../../components/ui/Links/SiteLink"
import { EquipmentResponseData } from "../../../../types/equipment.types"
import { EquipmentTypeResponseData } from "../../../../types/equipmentType.types"
import { SiteResponseData } from "../../../../types/sites.types"
import EquipmentTypeLabel from "./EquipmentTypeLabel"

const EquipmentRow = (props: {
    equipment: EquipmentResponseData,
    equipmentType: EquipmentTypeResponseData | undefined,
    site: SiteResponseData | undefined,
    hideSite?: boolean,
    hideType?: boolean,
}) => {
    return (
        <tr>
            <td className="text-left">
                <div className="flex">
                    <NewEquipmentLink 
                        code={props.equipment.data.code}
                        inactive={!props.equipment.data.is_active}
                    />
                </div>
            </td>
            {!props.hideSite ? 
                <td className="text-left">{props.site ? <SiteLink code={props.site.data.code} name={props.site.data.name}/> : ''}</td> : 
                null
            }
            {!props.hideType ? 
                <td><EquipmentTypeLabel equipmentType={props.equipmentType}/></td> :
                null 
            }
            <td className="text-left">{props.equipment.data.location}</td>
            <td className="text-left">{props.equipment.data.description}</td>
            <td className="text-left">{props.equipment.data.model_number}</td>
            <td className="text-left">{props.equipment.data.serial_number}</td>
        </tr>
    )
}

export default EquipmentRow