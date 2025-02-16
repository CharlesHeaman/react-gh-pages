import TimegridStatus from "../../../../../components/timegrid/TimegridStatus/TimegridStatus"
import { TicketResponseData } from "../../../../../types/tickets.types"
import { TimegridResponseData } from "../../../../../types/timegrid.types"
import { UserResponseData } from "../../../../../types/user.types"
import formatDate from "../../../../../utils/formatDate"

const TimegridStickyHeader = (props: {
    timegridData: TimegridResponseData,
    userData: UserResponseData,
    ticketData: Array<TicketResponseData>,
}) => {
    return (
        <div className="flex">
            <TimegridStatus
                status={props.timegridData.data.status} 
                noTickets={props.ticketData.length === 0}
                hideIcon
            />
            <p style={{ fontSize: '0.85em'}}>{`${props.userData.data.first_name} ${props.userData.data.last_name}`} timegrid for {formatDate(props.timegridData.data.date)}</p>

        </div>
    )
}

export default TimegridStickyHeader