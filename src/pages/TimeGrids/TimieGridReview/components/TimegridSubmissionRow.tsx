import TimegridStatus from "../../../../components/timegrid/TimegridStatus/TimegridStatus"
import UserLink from "../../../../components/ui/Links/UserLink"
import { TimegridResponseData } from "../../../../types/timegrid.types"
import { UserResponseData } from "../../../../types/user.types"
import TimegridLink from "../../TimeGridSummary/components/TimegridList/components/TimegridLink"

const TimegridSubmissionRow = (props: {
    user: UserResponseData,
    timegrid: TimegridResponseData,
    date: Date
}) => {
    return (
        <tr>
            <td className="text-left"><TimegridLink departmentName={""} user={props.user} date={props.date}/></td>
            <td className="text-left"><UserLink username={props.user.data.username} firstName={props.user.data.first_name} lastName={props.user.data.last_name}/></td>
            <td>
                <TimegridStatus
                    status={props.timegrid.data.status} 
                    noTickets={false} 
                />
            </td>
        </tr>
    )
}

export default TimegridSubmissionRow