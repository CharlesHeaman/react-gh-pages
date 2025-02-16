import UserLink from "../../../../../../../components/ui/Links/UserLink"
import { RefrigerantActivityResponseData } from "../../../../../../../types/refrigerantActivity.types"
import { UserResponseData } from "../../../../../../../types/user.types"
import formatDateTimestamp from "../../../../../../../utils/formatTimestamp"
import RefrigerantActivityLabel from "./RefrigerantActivityLabel"


const RefrigerantActivityRow = (props: {
    refrigerantActivity: RefrigerantActivityResponseData,
    user: UserResponseData | undefined,
}) => {
    return (
        <tr>
            <td><RefrigerantActivityLabel action={props.refrigerantActivity.data.type}/></td>
            <td className="text-left">{props.user ? <UserLink username={props.user.data.username} firstName={props.user.data.first_name} lastName={props.user.data.last_name}/> : 'Unknown'}</td>
            <td>{formatDateTimestamp(props.refrigerantActivity.data.created_at)}</td>
        </tr>
    )
}

export default RefrigerantActivityRow