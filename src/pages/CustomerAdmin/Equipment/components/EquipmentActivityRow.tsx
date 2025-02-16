import UserLink from "../../../../components/ui/Links/UserLink"
import { EquipmentActivityResponseData } from "../../../../types/equipmentActivity.types"
import { UserResponseData } from "../../../../types/user.types"
import formatDateTimestamp from "../../../../utils/formatTimestamp"
import EquipmentActivityLabel from "./EquipmentActivityLabel"

const EquipmentActivityRow = (props: {
    equipmentActivity: EquipmentActivityResponseData,
    user: UserResponseData | undefined,
}) => {
    return (
        <tr>
            <td><EquipmentActivityLabel action={props.equipmentActivity.data.type}/></td>
            <td className="text-left">{props.user ? <UserLink username={props.user.data.username} firstName={props.user.data.first_name} lastName={props.user.data.last_name}/> : 'Unknown'}</td>
            <td>{formatDateTimestamp(props.equipmentActivity.data.created_at)}</td>
        </tr>
    )
}

export default EquipmentActivityRow