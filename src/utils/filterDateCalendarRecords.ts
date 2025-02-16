import { CalendarRecordResponseData } from "../types/calendarRecord.types"
import isSameDay from "./isSameData"

const filterDateCalendarRecords = (calendarRecords: Array<CalendarRecordResponseData>, date: Date) => {
    return calendarRecords.filter(calendarRecord => isSameDay(new Date(calendarRecord.data.date), new Date(date)))
}

export default filterDateCalendarRecords