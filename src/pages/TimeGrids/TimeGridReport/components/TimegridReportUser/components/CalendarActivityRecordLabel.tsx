import Label from "../../../../../../components/ui/General/Label/Label"
import { CalendarActivityResponseData } from "../../../../../../types/calendarActivity.types"
import { CalendarRecordResponseData } from "../../../../../../types/calendarRecord.types"
import getCalendarRecordDayPart from "../../../../../../utils/getCalendarRecordDayPart"

const CalendarActivityRecordLabel = (props: {
    calendarActivity: CalendarActivityResponseData | undefined,
    calendarRecord: CalendarRecordResponseData
}) => {
    return (
        props.calendarActivity ? <Label
            text={`${props.calendarActivity.data.name} ${getCalendarRecordDayPart(props.calendarRecord.data.day_part)}`} 
            title={props.calendarActivity.data.description}
            hex={props.calendarActivity.data.label_color}
        /> : null
    )
}

export default CalendarActivityRecordLabel