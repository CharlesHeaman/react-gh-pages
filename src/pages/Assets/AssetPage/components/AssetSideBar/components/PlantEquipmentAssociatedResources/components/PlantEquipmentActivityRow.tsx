import UserLink from "../../../../../../../../components/ui/Links/UserLink"
import { PlantEquipmentActivityResponseData } from "../../../../../../../../types/plantEquipmentActivity.types"
import { UserResponseData } from "../../../../../../../../types/user.types"
import formatDateTimestamp from "../../../../../../../../utils/formatTimestamp"
import PlantEquipmentActivityLabel from "./PlantEquipmentActivityLabel"

const PlantEquipmentActivityRow = (props: {
    plantEquipmentActivity: PlantEquipmentActivityResponseData,
    user: UserResponseData | undefined,
}) => {
    return (
        <tr>
            <td><PlantEquipmentActivityLabel action={props.plantEquipmentActivity.data.type}/></td>
            <td className="text-left">{props.user ? <UserLink username={props.user.data.username} firstName={props.user.data.first_name} lastName={props.user.data.last_name}/> : 'Unknown'}</td>
            <td>{formatDateTimestamp(props.plantEquipmentActivity.data.created_at)}</td>
        </tr>
    )
}

export default PlantEquipmentActivityRow