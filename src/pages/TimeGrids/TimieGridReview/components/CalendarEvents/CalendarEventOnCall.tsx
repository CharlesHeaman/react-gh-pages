import UserLink from "../../../../../components/ui/Links/UserLink"
import { OnCallEngineerResponseData } from "../../../../../types/OnCallEngineer.types"
import { UserResponseData } from "../../../../../types/user.types"
import OnCallLabel from "../../../components/OnCallLabel"

const CalendarOnCallRow = (props: {
    onCallEngineer: OnCallEngineerResponseData,
    date: Date,
    user: UserResponseData | undefined
}) => {
    return (
        <tr>
            <td>
                <OnCallLabel
                    onCallEngineer={props.onCallEngineer}
                    date={props.date}
                />
            </td>
            <td className="text-left">{props.user ? <UserLink username={props.user.data.username} firstName={props.user.data.first_name} lastName={props.user.data.last_name}/> : null}</td>
        </tr>
    )
}

export default CalendarOnCallRow