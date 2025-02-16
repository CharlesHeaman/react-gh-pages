import Label from "../../../components/ui/General/Label/Label"

const TicketTypeLabel = (props: {
    ticketType: number,
    hideText?: boolean,
}) => {

    return props.ticketType === 0 ?
        <Label text='Service' iconFont="local_activity" color="grey" hideText={props.hideText}/> : 
        <Label text='Maintenance' iconFont="confirmation_number" color="grey" hideText={props.hideText}/> 
}

export default TicketTypeLabel