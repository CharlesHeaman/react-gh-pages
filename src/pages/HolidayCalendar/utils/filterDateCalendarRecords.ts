import { CalendarRecordResponseData } from "../../../types/calendarRecord.types"

const filterDateCalendarRecords = (calendarRecords: Array<CalendarRecordResponseData>, date: Date): Array<CalendarRecordResponseData> => {
    return calendarRecords.filter(calendarRecord => 
        new Date(new Date(calendarRecord.data.date).setHours(0,0,0,0)) <= new Date(date) && 
        new Date(new Date(calendarRecord.data.date).setHours(23,59,59,999)) >= new Date(date)
    )
}

export default filterDateCalendarRecords