import UserLink from "../../../../../../../components/ui/Links/UserLink"
import { UserResponseData } from "../../../../../../../types/user.types"
import { VehicleActivityResponseData } from "../../../../../../../types/vehicleActivity.types"
import formatDateTimestamp from "../../../../../../../utils/formatTimestamp"
import VehicleActivityLabel from "./VehicleActivityLabel"

const VehicleActivityRow = (props: {
    vehicleActivity: VehicleActivityResponseData,
    user: UserResponseData | undefined,
}) => {
    return (
        <tr>
            <td><VehicleActivityLabel action={props.vehicleActivity.data.type}/></td>
            <td className="text-left">{props.user ? <UserLink username={props.user.data.username} firstName={props.user.data.first_name} lastName={props.user.data.last_name}/> : 'Unknown'}</td>
            <td>{formatDateTimestamp(props.vehicleActivity.data.created_at)}</td>
        </tr>
    )
}

export default VehicleActivityRow