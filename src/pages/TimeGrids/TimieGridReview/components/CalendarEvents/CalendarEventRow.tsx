import Label from "../../../../../components/ui/General/Label/Label"
import UserLink from "../../../../../components/ui/Links/UserLink"
import { CalendarActivityResponseData } from "../../../../../types/calendarActivity.types"
import { CalendarRecordResponseData } from "../../../../../types/calendarRecord.types"
import { UserResponseData } from "../../../../../types/user.types"
import getCalendarRecordIcon from "../../../../HolidayCalendar/components/getCalendarRecordIcon"

const CalendarEventRow = (props: {
    calendarRecord: CalendarRecordResponseData, 
    user: UserResponseData | undefined,
    activity: CalendarActivityResponseData | undefined
}) => {
    return (
        props.activity ? <tr>
            <td><Label
                iconFont={getCalendarRecordIcon(props.activity.id)}
                text={props.activity.data.name}
                title={props.activity.data.description}
                hex={props.activity.data.label_color}
            /></td>
            <td className="text-left">{props.user ? <UserLink username={props.user.data.username} firstName={props.user.data.first_name} lastName={props.user.data.last_name}/> : null}</td>
        </tr> : null
    )
}

export default CalendarEventRow