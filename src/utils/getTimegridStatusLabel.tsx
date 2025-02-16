import TimegridStatus from "../components/timegrid/TimegridStatus/TimegridStatus"
import { TicketResponseData } from "../types/tickets.types"
import { TimegridResponseData } from "../types/timegrid.types"

const getTimegridStatusLabel = (tickets: Array<TicketResponseData>, timegrid: TimegridResponseData) => {
    return <TimegridStatus
        status={timegrid.data.status} 
        noTickets={tickets.length === 0}
        hideIcon
    />
}

export default getTimegridStatusLabel