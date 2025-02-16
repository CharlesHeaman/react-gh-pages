import { AdditionalTimeResponseData } from "../../../../../types/additionalTime.types"
import { AdditionalTimeActivityResponseData } from "../../../../../types/additionalTimeActivity.types"
import { CalendarActivityResponseData } from "../../../../../types/calendarActivity.types"
import { CalendarRecordResponseData } from "../../../../../types/calendarRecord.types"
import { CustomerResponseData } from "../../../../../types/customers.types"
import { OnCallEngineerResponseData } from "../../../../../types/OnCallEngineer.types"
import { TicketResponseData } from "../../../../../types/tickets.types"
import { TimegridResponseData } from "../../../../../types/timegrid.types"
import { TimegridNoteResponseData } from "../../../../../types/timegridNote.types"
import { TimegridTicketTimeResponseData } from "../../../../../types/timegridTicketTime.types"
import { UserResponseData } from "../../../../../types/user.types"
import filterDateCalendarRecords from "../../../../../utils/filterDateCalendarRecords"
import filterDateOnCallEngineers from "../../../../../utils/filterDateOnCallEngineers"
import filterTimegridAdditionalTime from "../../../../../utils/filterTimegridAdditionalTime"
import filterTimegridTickets from "../../../../../utils/filterTimegridTickets"
import filterTimegridTimegridNotes from "../../../../../utils/filterTimegridTimegridNotes"
import findDateUserTimegrid from "../../../../../utils/findDateUserTimegrid"
import getDayRelativeDate from "../../../../../utils/getDayRelativeDate"
import reduceTimegridTicketTime from "../../../../../utils/reduceTimegridTicketTime"
import reducedAdditionalTime from "../../../TimieGridReview/components/utils/reducedAdditionalTime"
import TimegridReportUserTimegrid from "./components/TimegridReportUserTimegrid"
import TimegridReportUserTotal from "./components/TimegridReportUserTotal"

const TimegridReportUser = (props: {
    user: UserResponseData,
    tickets: Array<TicketResponseData>,
    timegrids: Array<TimegridResponseData>,
    timegridNotes: Array<TimegridNoteResponseData>,
    additionalTime: Array<AdditionalTimeResponseData>,
    timegridTicketTime: Array<TimegridTicketTimeResponseData>,
    additionalTimeActivity: Array<AdditionalTimeActivityResponseData>,
    calendarRecords: Array<CalendarRecordResponseData>,
    calendarActivities: Array<CalendarActivityResponseData>,
    onCallEngineers: Array<OnCallEngineerResponseData>,
    customers: Array<CustomerResponseData>,
    notesUsers: Array<UserResponseData>,
    startDate: Date,
    isAccounts: boolean
}) => {
    const getTimegridForDate = (date: Date): TimegridResponseData => {
        const timegrid = findDateUserTimegrid(props.timegrids, props.user.id, date);
        if (timegrid) return timegrid
        return {
            id: -1,
            data: {
                user_id: props.user.id,
                date: date,
                status: -1,
                is_authorisation_required: false,
                comment: null
            },
            object: 'timegrid',
            url: '',
            data_updated_at: new Date()
        }
    }

    const getCurrentDate = (offset: number) => {
        return getDayRelativeDate(props.startDate, offset)
    }

    return (
        <div style={{ pageBreakInside: 'avoid', pageBreakAfter: 'always' }}>
            <section>
                <h2>{props.user.data.first_name} {props.user.data.last_name}</h2>
                <table>
                    <tbody>
                        {[...Array(7)].map((_, index) => 
                            <TimegridReportUserTimegrid
                                user={props.user}
                                timegrid={getTimegridForDate(getCurrentDate(index))}
                                tickets={filterTimegridTickets(props.tickets, getTimegridForDate(getCurrentDate(index)))}
                                timegridNotes={filterTimegridTimegridNotes(props.timegridNotes, getTimegridForDate(getCurrentDate(index)))}
                                additionalTime={filterTimegridAdditionalTime(props.additionalTime, getTimegridForDate(getCurrentDate(index)))}
                                timegridTicketTime={props.timegridTicketTime}
                                additionalTimeActivity={props.additionalTimeActivity}
                                calendarRecords={filterDateCalendarRecords(props.calendarRecords, getCurrentDate(index))}
                                calendarActivities={props.calendarActivities}
                                customers={props.customers}
                                notesUsers={props.notesUsers}
                                onCallEngineers={filterDateOnCallEngineers(props.onCallEngineers, getCurrentDate(index))}
                                isAccounts={props.isAccounts}
                                currentDate={getCurrentDate(index)}
                                key={index}
                            />
                        )}
                    </tbody>
                </table>
                <TimegridReportUserTotal
                    reducedTimegridTicketTime={reduceTimegridTicketTime(props.timegridTicketTime)}
                    reducedAdditionalTime={reducedAdditionalTime(props.additionalTime)}
                    isAccounts={props.isAccounts}
                />
            </section>
        </div>
    )
}

export default TimegridReportUser