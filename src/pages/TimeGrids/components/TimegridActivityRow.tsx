import UserLink from "../../../components/ui/Links/UserLink"
import { TimegridActivityResponseData } from "../../../types/timegridActivity.types"
import { UserResponseData } from "../../../types/user.types"
import formatDateTimestamp from "../../../utils/formatTimestamp"
import TimegridActivityLabel from "./TimegridActivityLabel"


const TimegridActivityRow = (props: {
    timegridActivity: TimegridActivityResponseData,
    user: UserResponseData | undefined,
}) => {
    return (
        <tr>
            <td><TimegridActivityLabel action={props.timegridActivity.data.type}/></td>
            <td className="text-left">{props.user ? <UserLink username={props.user.data.username} firstName={props.user.data.first_name} lastName={props.user.data.last_name}/> : 'Unknown'}</td>
            <td>{formatDateTimestamp(props.timegridActivity.data.activity_date)}</td>
        </tr>
    )
}

export default TimegridActivityRow