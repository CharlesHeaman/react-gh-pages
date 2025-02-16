import { TicketResponseData } from "../../../types/tickets.types";
import getTicketURL from "./utils/getTicketURL"

const TicketLink = (props: {
    ticket: TicketResponseData,
    departmentName: string,
}) => {
    const ticketNumber = props.ticket.data.ticket_type <= 1 ? props.ticket.data.number : props.ticket.data.parent_ticket_id;
    const linkTicketSuffix = props.ticket.data.ticket_type <= 1 ? props.ticket.data.suffix : 0;
    return (
        <a 
            href={getTicketURL(props.departmentName, ticketNumber ? ticketNumber : props.ticket.data.number, linkTicketSuffix)}
            className="icon-link"
        >
            <span className="material-icons">{props.ticket.data.ticket_type === 0 ? 'local_activity' : 'confirmation_number'}</span>
            <span>{`${props.departmentName.charAt(0)}T${ticketNumber}${props.ticket.data.suffix > 0 ? `/${props.ticket.data.suffix}` : ''}`}</span>
        </a>
    )
}

export default TicketLink