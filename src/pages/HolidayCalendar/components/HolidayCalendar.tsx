import { Dispatch, SetStateAction, useState } from "react";
import { CalendarRecordResponseData } from "../../../types/calendarRecord.types";
import getDayRelativeDate from "../../../utils/getDayRelativeDate";
import styles from "./../../OnCallCalendar/components/OnCallCalendar/OnCallCalendar.module.css";
import HolidayCalendarDay from "./HolidayCalendarDay";
import filterDateCalendarRecords from "../../../utils/filterDateCalendarRecords";
import { UserResponseData } from "../../../types/user.types";
import { CalendarActivityResponseData } from "../../../types/calendarActivity.types";

const HolidayCalendar = (props: {
    firstDayOfMonth: Date,
    lastDayOfMonth: Date,
    startDate: Date,
    calendarRecords: Array<CalendarRecordResponseData>,
    users: Array<UserResponseData>,
    activities: Array<CalendarActivityResponseData>,
    setCurrentSelected: Dispatch<SetStateAction<number>>
    setCurrentCreateDate: Dispatch<SetStateAction<Date | undefined>>
}) => {

    const [currentHover, setCurrentHover] = useState<number>(-1);

    const isSameMonth = (date: Date) => {
        return (
            date.getTime() >= props.firstDayOfMonth.getTime() &&
            date.getTime() <= props.lastDayOfMonth.getTime()
        )
    }

    const getCurrentDate = (rowIndex: number, columnIndex: number) => {
        return getDayRelativeDate(props.startDate, (rowIndex * 7) + columnIndex)
    }
    
    return (
        <>
            <table className={styles['calendar-table']}>
                <thead>
                    <tr>
                        <th>Monday</th>
                        <th>Tuesday</th>
                        <th>Wednesday</th>
                        <th>Thursday</th>
                        <th>Friday</th>
                        <th className={styles['weekend']}>Saturday</th>
                        <th className={styles['weekend']}>Sunday</th>
                    </tr>
                </thead>
                <tbody>
                    {[...Array(6)].map((_, rowIndex) => 
                        <tr key={rowIndex}>
                            {[...Array(7)].map((_, columnIndex) => 
                                <HolidayCalendarDay
                                    date={getCurrentDate(rowIndex, columnIndex)}
                                    isSameMonth={isSameMonth(getCurrentDate(rowIndex, columnIndex))}
                                    currentHover={currentHover}
                                    setCurrentHover={setCurrentHover}
                                    setCurrentSelected={props.setCurrentSelected}
                                    setCurrentCreateDate={props.setCurrentCreateDate}
                                    calendarRecords={filterDateCalendarRecords(props.calendarRecords, getCurrentDate(rowIndex, columnIndex))}
                                    users={props.users}
                                    activities={props.activities}
                                    key={columnIndex}
                                />
                            )}
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    )
}

export default HolidayCalendar