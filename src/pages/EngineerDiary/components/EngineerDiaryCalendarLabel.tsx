import Label from "../../../components/ui/General/Label/Label"
import { CalendarActivityResponseData } from "../../../types/calendarActivity.types"

const EngineerDiaryCalendarLabel = (props: {
    activity: CalendarActivityResponseData | undefined,
    short?: boolean,
}) => {
    return (
        props.activity ?
            <Label 
                iconFont="calendar_month"
                text={!props.short ? props.activity.data.name : props.activity.data.name.substring(0, 1)}
                hex={props.activity.data.label_color}
                title={props.activity.data.name}
            /> : null
    )
}

export default EngineerDiaryCalendarLabel