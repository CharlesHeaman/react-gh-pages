import TimegridStatus from "../../../../../../components/timegrid/TimegridStatus/TimegridStatus";
import UserLink from "../../../../../../components/ui/Links/UserLink";
import { TimegridResponseData } from "../../../../../../types/timegrid.types";
import { UserResponseData } from "../../../../../../types/user.types";
import TimegridLink from "./TimegridLink";

const TimegridRow = (props: {
    user: UserResponseData,
    timegrid: TimegridResponseData | undefined,
    departmentName: string,
    date: Date
}) => {
    return (
        <tr>
            <td className="text-left">
                <TimegridLink 
                    user={props.user} 
                    date={props.date}
                    departmentName={props.departmentName}
                />
            </td>
            <td className="text-left"><UserLink username={props.user.data.username} firstName={props.user.data.first_name} lastName={props.user.data.last_name}/></td>
            <td>
                <TimegridStatus
                    status={props.timegrid ? props.timegrid.data.status : -1} 
                    noTickets={false} 
                    hideText
                />
            </td>
        </tr>
    )
}

export default TimegridRow