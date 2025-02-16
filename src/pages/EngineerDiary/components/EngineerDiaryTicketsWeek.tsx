import { CalendarActivityResponseData } from "../../../types/calendarActivity.types";
import { CalendarRecordResponseData } from "../../../types/calendarRecord.types";
import { DepartmentResponseData } from "../../../types/department.types";
import { TicketResponseData } from "../../../types/tickets.types";
import { UserResponseData } from "../../../types/user.types";
import filterCalendarRecordUser from "../../../utils/filterCalendarRecordUser";
import filterDateCalendarRecords from "../../../utils/filterDateCalendarRecords";
import getDayRelativeDate from "../../../utils/getDayRelativeDate";
import getDaysInMonth from "../../../utils/getDaysInMonth";
import getUserFullName from "../../../utils/getUserFullName";
import filterTicketEngineer from "../utils/filterTicketEngineer";
import filterTicketVisitDate from "../utils/filterTicketVistiDate";
import styles from "./../../OnCallCalendar/components/OnCallCalendar/OnCallCalendar.module.css";
import EngineerDiaryTicketDay from "./EngineerDiaryTicketDay";

const EngineerDiaryTicketsWeek = (props: {
    department: DepartmentResponseData,
    startDate: Date,
    tickets: Array<TicketResponseData>,
    engineers: Array<UserResponseData>,
    calendarRecords: Array<CalendarRecordResponseData>,
    activities: Array<CalendarActivityResponseData>,
    month?: boolean
}) => {
    const getCurrentDate = (columnIndex: number) => {
        return getDayRelativeDate(props.startDate, columnIndex)
    }

    const columnCount = props.month ? getDaysInMonth(props.startDate) : 7

    return (
        <section>
            <h2>Assigned Tickets</h2>
            <div className="table-wrapper">
                <table className={styles['calendar-table']}>
                    <thead>
                        <tr>
                            <th
                                style={{
                                    width: '120px'
                                }}
                            >Engineer</th>
                            {[...Array(columnCount)].map((_, columnIndex) => 
                                <th 
                                    className={getCurrentDate(columnIndex).getDay() % 6 === 0 ? styles['weekend'] : ''}
                                    style={{
                                        width: props.month ? '70px' : '120px'
                                    }}
                                >
                                    {getCurrentDate(columnIndex).toLocaleString('default', props.month ? { day: 'numeric'} : { weekday: 'long', day: 'numeric' })}
                                </th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {props.engineers.map((engineer, index) =>
                            <tr key={index}>
                                <td 
                                    style={{ 
                                        fontWeight: 600, 
                                        fontSize: 'var(--h3-size)', 
                                        verticalAlign: 'middle' 
                                    }}>
                                    {getUserFullName(engineer)}
                                </td>
                                {[...Array(columnCount)].map((_, columnIndex) => 
                                    <EngineerDiaryTicketDay
                                        tickets={filterTicketEngineer(filterTicketVisitDate(props.tickets, getCurrentDate(columnIndex)), engineer.id)}
                                        maxHours={props.department.data.day_max_hours}
                                        isSameMonth={true}
                                        isWeekend={getCurrentDate(columnIndex).getDay() % 6 === 0}
                                        calendarRecords={filterCalendarRecordUser(filterDateCalendarRecords(props.calendarRecords, getCurrentDate(columnIndex)), engineer.id)}
                                        activities={props.activities}
                                        short={props.month}
                                        key={columnIndex}
                                    />
                                )}
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </section>
    )
}

export default EngineerDiaryTicketsWeek