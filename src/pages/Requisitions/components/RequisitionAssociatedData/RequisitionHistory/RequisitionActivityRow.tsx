import UserLink from "../../../../../components/ui/Links/UserLink"
import { RequisitionActivityResponseData } from "../../../../../types/requisitionActivity.types"
import { UserResponseData } from "../../../../../types/user.types"
import formatDateTimestamp from "../../../../../utils/formatTimestamp"
import RequisitionActivityLabel from "./RequisitionActivityLabel"

const RequisitionActivityRow = (props: {
    requisitionActivity: RequisitionActivityResponseData,
    user: UserResponseData | undefined,
}) => {
    return (
        <tr>
            <td><RequisitionActivityLabel action={props.requisitionActivity.data.type}/></td>
            <td className="text-left">{props.user ? <UserLink username={props.user.data.username} firstName={props.user.data.first_name} lastName={props.user.data.last_name}/> : 'Unknown'}</td>
            <td>{formatDateTimestamp(props.requisitionActivity.data.created_at)}</td>
        </tr>
    )
}

export default RequisitionActivityRow