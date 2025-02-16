import Label from "../../../../../../components/ui/General/Label/Label"
import TimegridLink from "../../../../../../components/ui/Links/TimegridLink"
import { AdditionalTimeActivityResponseData } from "../../../../../../types/additionalTimeActivity.types"
import { AdditionalTimeResponseData } from "../../../../../../types/additionalTime.types"
import { CalendarActivityResponseData } from "../../../../../../types/calendarActivity.types"
import { CalendarRecordResponseData } from "../../../../../../types/calendarRecord.types"
import { CustomerResponseData } from "../../../../../../types/customers.types"
import { TicketResponseData } from "../../../../../../types/tickets.types"
import { TimegridResponseData } from "../../../../../../types/timegrid.types"
import { TimegridNoteResponseData } from "../../../../../../types/timegridNote.types"
import { TimegridTicketTimeResponseData } from "../../../../../../types/timegridTicketTime.types"
import { UserResponseData } from "../../../../../../types/user.types"
import filterTicketsUserTimegridTicketTime from "../../../../../../utils/filterTicketsUserTimegridTicketTime"
import findCalendarActivity from "../../../../../../utils/findCalendarActivity"
import formatDate from "../../../../../../utils/formatDate"
import getTimegridStatusLabel from "../../../../../../utils/getTimegridStatusLabel"
import CalendarActivityRecordLabel from "./CalendarActivityRecordLabel"
import TimegridReportNotes from "./components/TimegridReportNotes"
import TimegridReportTimeTable from "./components/TimegridReportTimeTable"
import OnCallLabel from "../../../../components/OnCallLabel"
import { OnCallEngineerResponseData } from "../../../../../../types/OnCallEngineer.types"

const TimegridReportUserTimegrid = (props: {
    user: UserResponseData,
    timegrid: TimegridResponseData,
    tickets: Array<TicketResponseData>,
    timegridNotes: Array<TimegridNoteResponseData>,
    additionalTime: Array<AdditionalTimeResponseData>,
    timegridTicketTime: Array<TimegridTicketTimeResponseData>,
    additionalTimeActivity: Array<AdditionalTimeActivityResponseData>,
    calendarRecords: Array<CalendarRecordResponseData>,
    calendarActivities: Array<CalendarActivityResponseData>,
    customers: Array<CustomerResponseData>,
    notesUsers: Array<UserResponseData>,
    onCallEngineers: Array<OnCallEngineerResponseData>,
    currentDate: Date,
    isAccounts: boolean
}) => {

    const timegridHasTime = () => {
        return (props.tickets.length + props.additionalTime.length) > 0
    }

    return (
        <>
            <tr>
                <td colSpan={props.isAccounts ? 1 : 2} style={{
                    backgroundColor: 'var(--contrast-bg)'
                }}>
                    <div style={{ display: 'flex', gap: 'var(--small-gap)', alignItems: 'center', paddingLeft: 'var(--small-gap)' }}>
                        <h3>{formatDate(props.timegrid.data.date, true)}</h3>
                        {props.timegrid.id > 0 && <TimegridLink timegridID={props.timegrid.id}/>}
                        {getTimegridStatusLabel(props.tickets, props.timegrid)}
                        {props.onCallEngineers.length > 0 && <OnCallLabel onCallEngineer={props.onCallEngineers[0]} date={props.currentDate} hideIcon/>}
                        {props.calendarRecords.map((calendarRecord, index) => 
                            <CalendarActivityRecordLabel
                                calendarActivity={findCalendarActivity(props.calendarActivities, calendarRecord.data.calendar_event_id)}
                                calendarRecord={calendarRecord}
                                key={index}
                            />
                        )}
                    </div>
                </td>
                {timegridHasTime() ? 
                    !props.isAccounts ? 
                        <>
                            <td style={{
                                backgroundColor: 'var(--contrast-bg)',
                                fontWeight: 600,
                                fontSize: '0.85em'
                            }}>On-site</td>
                            <td style={{
                                backgroundColor: 'var(--contrast-bg)',
                                fontWeight: 600,
                                fontSize: '0.85em'
                            }}>Travel</td>
                            <td style={{
                                backgroundColor: 'var(--contrast-bg)',
                                fontWeight: 600,
                                fontSize: '0.85em'
                            }}>Miles</td>
                            <td style={{
                                backgroundColor: 'var(--contrast-bg)',
                                fontWeight: 600,
                                fontSize: '0.85em'
                            }}>Expenses</td>
                        </> : 
                        <>
                            <td style={{
                                backgroundColor: 'var(--contrast-bg)',
                                fontWeight: 600,
                                fontSize: '0.85em'
                            }}>Hours</td>
                            <td style={{
                                backgroundColor: 'var(--contrast-bg)',
                                fontWeight: 600,
                                fontSize: '0.85em'
                            }}>Own Miles</td>
                        </>
                    : 
                    <td colSpan={99} style={{
                        backgroundColor: 'var(--contrast-bg)',
                    }}></td>
                }
            </tr>
                {timegridHasTime() && 
                    <TimegridReportTimeTable
                        userID={props.user.id}
                        tickets={props.tickets}
                        timegridTicketTime={filterTicketsUserTimegridTicketTime(props.timegridTicketTime, props.tickets, props.user.id)}
                        additionalTime={props.additionalTime}
                        customers={props.customers}
                        additionalTimeActivity={props.additionalTimeActivity}
                        isAccounts={props.isAccounts}
                    />
                }
                <TimegridReportNotes
                    userID={props.user.id}
                    timegridNotes={props.timegridNotes}
                    users={props.notesUsers}
                />
        </>
    )
}

export default TimegridReportUserTimegrid