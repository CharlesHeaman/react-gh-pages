import { CalendarActivityResponseData } from "../../../../../types/calendarActivity.types"
import { CalendarRecordResponseData } from "../../../../../types/calendarRecord.types"
import { OnCallEngineerResponseData } from "../../../../../types/OnCallEngineer.types"
import { UserResponseData } from "../../../../../types/user.types"
import findCalendarActivity from "../../../../../utils/findCalendarActivity"
import findUser from "../../../../../utils/findUser"
import CalendarEventOnCall from "./CalendarEventOnCall"
import CalendarEventRow from "./CalendarEventRow"

const TimegridCalendarEvents = (props: {
    user: UserResponseData,
    date: Date,
    onCallEngineers: Array<OnCallEngineerResponseData>,
    onCallEngineerUsers: Array<UserResponseData>,
    calendarRecords: Array<CalendarRecordResponseData>,
    calendarActivities: Array<CalendarActivityResponseData>,
    calendarUsers: Array<UserResponseData>
}) => {
    return (
        <>
            <section>
                <h2>Calendar Records</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Record</th>
                            <th>Added By</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.onCallEngineers.map((onCallEngineer, index) => 
                            <CalendarEventOnCall
                                onCallEngineer={onCallEngineer}
                                date={props.date}
                                user={findUser(props.onCallEngineerUsers, onCallEngineer.data.created_by_id)}
                                key={index}
                            />
                        )}
                        {props.calendarRecords.map((calendarRecord, index) => 
                            <CalendarEventRow
                                calendarRecord={calendarRecord}
                                user={findUser(props.calendarUsers, calendarRecord.data.created_by_id)}
                                activity={findCalendarActivity(props.calendarActivities, calendarRecord.data.calendar_event_id)}
                                key={index}
                            />
                        )}
                    </tbody>
                </table>
            </section>
            <hr/>
        </>
    )
}

export default TimegridCalendarEvents