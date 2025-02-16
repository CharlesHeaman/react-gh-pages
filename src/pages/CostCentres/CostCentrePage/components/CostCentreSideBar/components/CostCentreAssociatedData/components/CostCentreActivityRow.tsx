import UserLink from "../../../../../../../../components/ui/Links/UserLink"
import { CostCentreActivityResponseData } from "../../../../../../../../types/costCentreActivity.types"
import { UserResponseData } from "../../../../../../../../types/user.types"
import formatDateTimestamp from "../../../../../../../../utils/formatTimestamp"
import BasicActivityLabel from "./CostCentreActivityLabel"

const CostCentreActivityRow = (props: {
    costCentreActivity: CostCentreActivityResponseData,
    user: UserResponseData | undefined,
}) => {
    return (
        <tr>
            <td><BasicActivityLabel action={props.costCentreActivity.data.type}/></td>
            <td className="text-left">{props.user ? <UserLink username={props.user.data.username} firstName={props.user.data.first_name} lastName={props.user.data.last_name}/> : 'Unknown'}</td>
            <td>{formatDateTimestamp(props.costCentreActivity.data.created_at)}</td>
        </tr>
    )
}

export default CostCentreActivityRow