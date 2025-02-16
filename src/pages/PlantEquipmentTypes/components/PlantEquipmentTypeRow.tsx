import BooleanLabel from "../../../components/ui/BooleanLabel/BooleanLabel"
import { PlantEquipmentTypeResponseData } from "../../../types/plantEquipmentTypes.types"
import PlantEquipmentTypeLink from "./PlantEquipmentTypeLink"

const PlantEquipmentTypeRow = (props: {
    plantEquipmentType: PlantEquipmentTypeResponseData,
}) => {
    return (
        <tr>
            <td className="text-left">
                <div className="flex">
                    <PlantEquipmentTypeLink     
                        plantEquipmentTypeID={props.plantEquipmentType.id}  
                        name={props.plantEquipmentType.data.name}
                        inactive={!props.plantEquipmentType.data.is_active}
                    />
                </div>
            </td>
            <td><BooleanLabel true={props.plantEquipmentType.data.is_pa_test_required}/></td>
            <td><BooleanLabel true={props.plantEquipmentType.data.is_calibration_test_required}/></td>
            <td><BooleanLabel true={props.plantEquipmentType.data.is_inspection_required}/></td>
            <td><BooleanLabel true={props.plantEquipmentType.data.is_maintenance_required}/></td>
        </tr>
    )
}

export default PlantEquipmentTypeRow