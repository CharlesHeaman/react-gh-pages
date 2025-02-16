import { AdditionalTimeActivityResponseData } from "../../../../../../../types/additionalTimeActivity.types"
import { AdditionalTimeResponseData } from "../../../../../../../types/additionalTime.types"
import { CustomerResponseData } from "../../../../../../../types/customers.types"
import { TicketResponseData } from "../../../../../../../types/tickets.types"
import { TimegridTicketTimeResponseData } from "../../../../../../../types/timegridTicketTime.types"
import findAdditionalTimeActivity from "../../../../../../../utils/findAdditionalTimeActivity"
import findCustomer from "../../../../../../../utils/findCustomer"
import filterTicketUserTimegridTicketTime from "../../../../../../../utils/findTicketUserTimegridTicketTime"
import reduceTimegridTicketTime from "../../../../../../../utils/reduceTimegridTicketTime"
import reducedAdditionalTime from "../../../../../TimieGridReview/components/utils/reducedAdditionalTime"
import TimegridReportDayTotal from "./TimegridReportTotalTime"
import TimeTableAdditionalTimeRow from "./TimeTableAdditionalTimeRow"
import TimeTableTicketRow from "./TimeTableTicketRow"

const TimegridReportTimeTable = (props: {
    userID: number,
    tickets: Array<TicketResponseData>,
    timegridTicketTime: Array<TimegridTicketTimeResponseData>,
    additionalTime: Array<AdditionalTimeResponseData>,
    additionalTimeActivity: Array<AdditionalTimeActivityResponseData>,
    customers: Array<CustomerResponseData>,
    isAccounts: boolean
}) => {
    return (
        <>
            {!props.isAccounts && props.tickets.map((ticket, index) => 
                <TimeTableTicketRow
                    ticket={ticket}
                    timegridTicketTime={filterTicketUserTimegridTicketTime(props.timegridTicketTime, ticket, props.userID)}
                    customer={findCustomer(props.customers, ticket.data.customer_id)}
                    isAccounts={props.isAccounts}
                    key={index}
                />
            )}
            {!props.isAccounts && props.additionalTime.map((additionalTime, index) =>
                <TimeTableAdditionalTimeRow
                    additionalTime={additionalTime}
                    activity={findAdditionalTimeActivity(props.additionalTimeActivity, additionalTime.data.activity_id)}
                    isAccounts={props.isAccounts}
                    key={index}
                />
            )}
            <TimegridReportDayTotal
                reducedTimegridTicketTime={reduceTimegridTicketTime(props.timegridTicketTime)}
                reducedAdditionalTime={reducedAdditionalTime(props.additionalTime)}
                isAccounts={props.isAccounts}
            />
        </>
    )
}

export default TimegridReportTimeTable