import Label from "../../../components/ui/General/Label/Label"
import { CalendarActivityResponseData } from "../../../types/calendarActivity.types"
import { CalendarRecordResponseData } from "../../../types/calendarRecord.types"
import { TicketResponseData } from "../../../types/tickets.types"
import findCalendarActivity from "../../../utils/findCalendarActivity"
import formatHours from "../../../utils/formatHours"
import reduceTicketEstimatedTime from "../../Ticket/utils/reduceTicketEstimatedTime"
import styles from "./../../HolidayCalendar/components/HolidayCalendarDay.module.css"
import EngineerDiaryCalendarLabel from "./EngineerDiaryCalendarLabel"

const EngineerDiaryTicketDay = (props: {
    maxHours: number,
    isSameMonth: boolean,
    isWeekend: boolean,
    tickets: Array<TicketResponseData>,
    calendarRecords: Array<CalendarRecordResponseData>,
    activities: Array<CalendarActivityResponseData>,
    short?: boolean,
}) => {

    const totalHours = reduceTicketEstimatedTime(props.tickets);
    
    return (
        <td className={`
            ${styles['calendar-day']}
            ${props.isWeekend ? styles['weekend'] : ''}
        `}>
            <div className={`
                ${styles['calendar-day-wrapper']} 
                ${props.isSameMonth ? '' : styles['other-month']}
            `}>
                <div className={styles['day-body']}>
                    {props.tickets.length > 0 ?
                        <>
                            <Label 
                                iconFont="confirmation_number" 
                                text={props.tickets.length > 0 ? `${props.tickets.length}${!props.short ? ` Ticket${props.tickets.length > 1 ? 's' : ''}` : ''}` : 'None'} 
                                color={props.tickets.length > 0 ? 'no-color' : 'grey'}
                            />
                            <Label 
                                iconFont="timer" 
                                text={`${formatHours(totalHours)}${!props.short ? ' hrs' : ''}`} 
                                color={totalHours > props.maxHours ? 'red' : 
                                    totalHours > props.maxHours - 1 ? 'light-green' : 'orange'
                                }
                            />
                        </> : null
                    }
                    {props.calendarRecords.map((calendarRecord, index) => 
                        <EngineerDiaryCalendarLabel
                            activity={findCalendarActivity(props.activities, calendarRecord.data.calendar_event_id)}
                            short={props.short}
                            key={index} 
                        />
                    )}
                </div>
            </div>
        </td>
    )
}

export default EngineerDiaryTicketDay