import { CalendarActivityResponseData } from "../types/calendarActivity.types"

const findCalendarActivity = (calendarActivities: Array<CalendarActivityResponseData>, calendarActivityID: number): CalendarActivityResponseData | undefined => {
    return calendarActivities.find(calendarActivity => calendarActivity.id === calendarActivityID);
}

export default findCalendarActivity