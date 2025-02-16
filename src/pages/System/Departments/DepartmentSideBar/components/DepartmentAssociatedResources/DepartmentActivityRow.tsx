import UserLink from "../../../../../../components/ui/Links/UserLink"
import { DepartmentActivityResponseData } from "../../../../../../types/departmentActivity.types"
import { UserResponseData } from "../../../../../../types/user.types"
import formatDateTimestamp from "../../../../../../utils/formatTimestamp"
import DepartmentActivityLabel from "./DepartmentActivityLabel"


const DepartmentActivityRow = (props: {
    departmentActivity: DepartmentActivityResponseData,
    user: UserResponseData | undefined,
}) => {
    return (
        <tr>
            <td><DepartmentActivityLabel action={props.departmentActivity.data.type}/></td>
            <td className="text-left">{props.user ? <UserLink username={props.user.data.username} firstName={props.user.data.first_name} lastName={props.user.data.last_name}/> : 'Unknown'}</td>
            <td>{formatDateTimestamp(props.departmentActivity.data.created_at)}</td>
        </tr>
    )
}

export default DepartmentActivityRow