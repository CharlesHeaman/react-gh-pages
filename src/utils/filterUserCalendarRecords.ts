import { CalendarRecordResponseData } from "../types/calendarRecord.types"

const filterUserCalendarRecords = (calendarRecords: Array<CalendarRecordResponseData>, userID: number) => {
    return calendarRecords.filter(calendarRecord => calendarRecord.data.user_id === userID)
}

export default filterUserCalendarRecords