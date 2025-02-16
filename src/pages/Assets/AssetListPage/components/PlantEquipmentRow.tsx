import AssignedLabel from "../../../../components/ui/AssignedLabel/AssignedLabel"
import ExpiryDateLabel from "../../../../components/ui/ExpiryDateLabel/ExpiryDateLabel"
import Label from "../../../../components/ui/General/Label/Label"
import SupplierManufacturerLink from "../../../../components/ui/Links/SupplierManufacturerLink"
import UserLink from "../../../../components/ui/Links/UserLink"
import { AssetResponseData } from "../../../../types/asset.types"
import { PlantEquipmentTypeResponseData } from "../../../../types/plantEquipmentTypes.types"
import { SupplierManufacturerResponseData } from "../../../../types/supplierManufacturer.types"
import { UserResponseData } from "../../../../types/user.types"
import PlantEquipmentLink from "../../components/PlantEquipmentLink"

const PlantEquipmentRow = (props: {
    asset: AssetResponseData,
    user: UserResponseData | undefined,
    manufacturer: SupplierManufacturerResponseData | undefined,
    type: PlantEquipmentTypeResponseData | undefined,
    hideAssignedTo?: boolean,
    hideType?: boolean,
    hideManufacturer?: boolean,
    hidePATestingDue?: boolean,
    hideCalibrationDue?: boolean,
    hideInspectionDue?: boolean,
    hideMaintenanceDue?: boolean,
}) => {
    return (
        <tr>
            <td className="text-left">
                <div className="flex">
                    <PlantEquipmentLink 
                        code={props.asset.data.code}
                        inactive={!props.asset.data.is_active}
                    />
                </div>
            </td>
            <td className="text-left">{props.asset.data.description}</td>
            {!props.hideManufacturer ? 
                <td className="text-left">{props.manufacturer ? 
                    <SupplierManufacturerLink code={props.manufacturer.data.code} name={props.manufacturer.data.name}/> : 
                    props.asset.data.manufacturer.length > 0 ? 
                        props.asset.data.manufacturer :
                        'Unknown'
                }</td>
                : null 
            }
            <td className="text-left">{props.asset.data.model_no}</td>
            {!props.hideType ? 
                <td className="text-left">{props.type ? <Label text={props.type.data.name} iconFont="handyman" color="no-color"/> : 'None'}</td>
                : null 
            }
            {!props.hidePATestingDue && <td><ExpiryDateLabel date={props.asset.data.next_pa_test}/></td>}
            {!props.hideCalibrationDue && <td><ExpiryDateLabel date={props.asset.data.next_calibration_test}/></td>}
            {!props.hideInspectionDue && <td><ExpiryDateLabel date={props.asset.data.next_inspection}/></td>}
            {!props.hideMaintenanceDue && <td><ExpiryDateLabel date={props.asset.data.next_maintenance}/></td>}
            {!props.hideAssignedTo ?
                <td className="text-left">{props.user ? 
                    <UserLink username={props.user.data.username} firstName={props.user.data.first_name} lastName={props.user.data.last_name}/> : 
                    <AssignedLabel isAssigned={undefined}/>
                }</td>
                : null
            }
        </tr>
    )
}

export default PlantEquipmentRow