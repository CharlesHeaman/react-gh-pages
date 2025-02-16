import { Dispatch, SetStateAction } from "react";
import Label from "../../../../../../../../components/ui/General/Label/Label";
import { TicketResponseData } from "../../../../../../../../types/tickets.types";
import TicketStatus from "../../../../../../../Tickets/components/TicketStatus/TicketStatus";

const SubmitTicketDataHeader = (props: {
    ticket: TicketResponseData,
    setCurrentTicketIndex: Dispatch<SetStateAction<number>>
    timegridID: number

}) => {
    return (
        <div className="flex flex-grow">
            <TicketStatus
                isComplete={props.ticket.data.is_report_complete} 
                isJobComplete={props.ticket.data.is_job_complete} 
                isLocked={props.ticket.data.visit_date > new Date()} 
                isStarted={props.ticket.data.is_started} 
                isUnableToCarryOut={props.ticket.data.is_unable_to_attend} 
                hideIcon
            />
            {props.ticket.data.ticket_type === 0 ?
                <Label text='Service' color='dark-blue' iconFont=""/> :
                <Label text='Maintenance' color='light-green' iconFont=""/>
            }
            <span className='flex-grow'></span>
        </div>
    )
}

export default SubmitTicketDataHeader