import { CalendarRecordResponseData } from "../types/calendarRecord.types"

const filterCalendarRecordUser = (calendarRecords: Array<CalendarRecordResponseData>, userID: number) => {
    return calendarRecords.filter(calendarRecord => calendarRecord.data.user_id === userID)
}

export default filterCalendarRecordUser