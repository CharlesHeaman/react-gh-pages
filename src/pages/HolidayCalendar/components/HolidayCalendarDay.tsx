import { Dispatch, SetStateAction } from "react"
import { CalendarRecordResponseData } from "../../../types/calendarRecord.types"
import { UserResponseData } from "../../../types/user.types"
import findUser from "../../../utils/findUser"
import isSameDay from "../../../utils/isSameData"
import styles from "./HolidayCalendarDay.module.css"
import CalendarRecordLabel from "./CalendarRecordLabel"
import { CalendarActivityResponseData } from "../../../types/calendarActivity.types"
import findCalendarActivity from "../../../utils/findCalendarActivity"
import PermsProtectedComponent from "../../../components/PermsProtectedComponent"

const HolidayCalendarDay = (props: {
    date: Date,
    isSameMonth: boolean,
    currentHover: number,
    setCurrentHover: Dispatch<SetStateAction<number>>,
    setCurrentSelected: Dispatch<SetStateAction<number>>,
    setCurrentCreateDate: Dispatch<SetStateAction<Date | undefined>>,
    calendarRecords: Array<CalendarRecordResponseData>,
    users: Array<UserResponseData>,
    activities: Array<CalendarActivityResponseData>
}) => {
    const isWeekend = props.date.getDay() % 6 === 0;
    
    return (
        <td className={`
            ${styles['calendar-day']}
            ${isWeekend ? styles['weekend'] : ''}
        `}>
            <div className={`
                ${styles['calendar-day-wrapper']} 
                ${props.isSameMonth ? '' : styles['other-month']}
            `}>
                <div className={styles['day-header']}>
                    <PermsProtectedComponent requiredPerms={{ calendars: 2 }}>
                        <span 
                            className={styles['add-button']}
                            onClick={() => props.setCurrentCreateDate(props.date)}
                        >
                            <span className="material-icons">add</span>
                        </span>
                    </PermsProtectedComponent>
                    <span className={`
                        ${styles['date']}
                        ${isSameDay(new Date(), props.date) ? styles['today'] : ''}
                    `}>{props.date.getDate()}</span>
                </div>
                <div className={styles['day-body']}>
                    {props.calendarRecords.map((calendarRecord, index) => 
                        <CalendarRecordLabel
                            calendarRecordID={calendarRecord.id} 
                            user={findUser(props.users, calendarRecord.data.user_id)}
                            activity={findCalendarActivity(props.activities, calendarRecord.data.calendar_event_id)}
                            currentHover={props.currentHover} 
                            setCurrentHover={props.setCurrentHover}    
                            setCurrentSelected={props.setCurrentSelected}                    
                            key={index} 
                        />
                    )}
                </div>
            </div>
        </td>
    )
}

export default HolidayCalendarDay