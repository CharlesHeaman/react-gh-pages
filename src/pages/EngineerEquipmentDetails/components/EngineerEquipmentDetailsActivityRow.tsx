import UserLink from "../../../components/ui/Links/UserLink"
import { EngineerEquipmentDetailsActivityResponseData } from "../../../types/engineerEquipmentDetailsActivity.types"
import { UserResponseData } from "../../../types/user.types"
import formatDateTimestamp from "../../../utils/formatTimestamp"
import EngineerEquipmentDetailsActivityLabel from "./EngineerEquipmentDetailsActivityLabel"

const EngineerEquipmentDetailsActivityRow = (props: {
    engineerEquipmentDetailsActivity: EngineerEquipmentDetailsActivityResponseData,
    user: UserResponseData | undefined,
}) => {
    return (
        <tr>
            <td><EngineerEquipmentDetailsActivityLabel action={props.engineerEquipmentDetailsActivity.data.type}/></td>
            <td className="text-left">{props.user ? <UserLink username={props.user.data.username} firstName={props.user.data.first_name} lastName={props.user.data.last_name}/> : 'Unknown'}</td>
            <td>{formatDateTimestamp(props.engineerEquipmentDetailsActivity.data.created_at)}</td>
        </tr>
    )
}

export default EngineerEquipmentDetailsActivityRow