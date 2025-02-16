import AssignedLabel from "../../../../components/ui/AssignedLabel/AssignedLabel"
import ExpiryDateLabel from "../../../../components/ui/ExpiryDateLabel/ExpiryDateLabel"
import UserLink from "../../../../components/ui/Links/UserLink"
import { CostCentreResponseData } from "../../../../types/costCentres.types"
import { UserResponseData } from "../../../../types/user.types"
import { VehicleResponseData } from "../../../../types/vehicles.types"
import formatDate from "../../../../utils/formatDate"
import CostCentreLabel from "../../../CostCentres/components/CostCentreLabel"
import VehicleLink from "../../components/VehicleLink"

const VehicleRow = (props: {
    vehicle: VehicleResponseData,
    user: UserResponseData | undefined,
    costCentre: CostCentreResponseData | undefined,
    hideAssignedTo?: boolean,
    hideCostCentre?: boolean,
}) => {
    return (
        <tr>
            <td className="text-left">
                <div className="flex">
                    <VehicleLink 
                        vehicleID={props.vehicle.id}
                        registrationNumber={props.vehicle.data.registration_number}
                        inactive={!props.vehicle.data.is_active}
                    />
                </div>
            </td>
            <td className="text-left">{props.vehicle.data.make}</td>
            <td className="text-left">{props.vehicle.data.model}</td>
            <td>{formatDate(props.vehicle.data.registration_date)}</td>
            <td><ExpiryDateLabel date={props.vehicle.data.mot_due_date}/></td>
            <td><ExpiryDateLabel date={props.vehicle.data.tax_due_date}/></td>
            {!props.hideAssignedTo ? 
                <td className="text-left">{props.user ? 
                    <UserLink username={props.user.data.username} firstName={props.user.data.first_name} lastName={props.user.data.last_name}/> : 
                    <AssignedLabel isAssigned={undefined}/>
                }</td>
                : null
            }
            {!props.hideCostCentre ? 
                <td className="text-left">{props.costCentre ? <CostCentreLabel costCentre={props.costCentre}/> : null}</td>
                : null 
            }
        </tr>
    )
}

export default VehicleRow