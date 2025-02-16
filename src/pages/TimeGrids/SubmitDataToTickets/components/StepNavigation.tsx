import { useSearchParams } from "react-router-dom";

const StepNavigation = (props: {
    departmentName: string | undefined,
    timegridID: string,
    currentTicketIndex: number,
    noOfTickets: number,
    small?: boolean
}) => {
    const [searchParams, setSearchParams] = useSearchParams();

    return (
        <div style={{ display: 'flex', gap: 'var(--small-gap)'}}>
            {searchParams.get('step') === 'distribute_ticket_time' || searchParams.get('step') === 'review_submit_data' ? 
                <>
                    <h3><a style={{ fontSize: props.small ? '0.85em' : ''}} href={`/#/${props.departmentName !== undefined ? `${props.departmentName}/` : ''}timegrids/${props.timegridID}/submit_time_to_tickets?step=distribute_ticket_time`}>Distribute Ticket Time</a></h3> 
                </> : ''
            }
            {searchParams.get('step') === 'review_submit_data' ? 
                <>
                    <span style={{ color: 'var(--grey-text-color)', fontSize: props.small ? '0.85em' : ''}}>/</span>
                    <h3><a style={{ fontSize: props.small ? '0.85em' : ''}} href={`/#/${props.departmentName !== undefined ? `${props.departmentName}/` : ''}timegrids/${props.timegridID}/submit_time_to_tickets?step=review_submit_data`}>Review Submit Data</a></h3> 
                </> : ''
            }
        </div>
    )
}

export default StepNavigation