import Label from "../../../../components/ui/General/Label/Label"
import { TicketInvoiceRequestResponseData } from "../../../../types/TicketInvoiceRequest.types"
import { TicketResponseData } from "../../../../types/tickets.types"
import TicketTypeLabel from "../../components/TicketTypeLabel"

const TicketStatuses = (props: {
    ticket: TicketResponseData,
    invoiceRequest: TicketInvoiceRequestResponseData | undefined,
    hideText?: boolean,
    hideType?: boolean,
}) => {
    return (
        <div className="flex">
            {props.ticket.data.is_abandoned ? 
                <Label text="Abandoned" iconFont="delete" color="red" hideText={props.hideText}/> :
                null
            }
            {!props.hideType ? <TicketTypeLabel ticketType={props.ticket.data.ticket_type} hideText={props.hideText}/> : null}
            {props.ticket.data.completion_date !== null ?
                <Label text="Complete" iconFont="check_circle" color="dark-blue" hideText={props.hideText}/> : 
                <>
                    {props.ticket.data.engineers.length > 0 ?
                        <Label text="Assigned" iconFont="assignment_ind" color="light-green" hideText={props.hideText}/> : 
                        <Label text="Unassigned" iconFont="person_off" color="dark-blue" hideText={props.hideText}/>
                    }
                </>
            }
            {props.ticket.data.is_further_work_required ?
                <Label text="Further Action Required" iconFont="request_quote" color="purple" hideText={props.hideText}/> : 
                null
            }
            {props.ticket.data.is_parts_required && !props.ticket.data.is_parts_received ?
                <Label text="Parts Outstanding" iconFont="inventory_2" color="red" hideText={props.hideText}/> : 
                null
            }
            {props.ticket.data.is_rams_required && !props.ticket.data.is_rams_uploaded ?
                <Label text="RAMS Outstanding" iconFont="assignment_late" color="red" hideText={props.hideText}/> : 
                null
            }
            {props.ticket.data.completion_date !== null && !props.ticket.data.is_ready_for_invoicing ?
                <Label text="Awaiting Costs" iconFont="hourglass_empty" color="orange" hideText={props.hideText}/> : 
                null
            }
            {props.ticket.data.is_further_work_required ?
                <Label text="Work Required" iconFont="priority_high" color="red" hideText={props.hideText}/> : 
                null
            }
            {props.invoiceRequest ?
                props.invoiceRequest.data.is_processed ? 
                    <Label text="Invoice Request Processed" iconFont="credit_card" color="dark-blue" hideText={props.hideText}/> :
                    props.invoiceRequest.data.holding_for_purchase_order_number ? 
                        <Label text="Holding Invoice Request" iconFont="credit_card" color="red" hideText={props.hideText}/> :
                        <Label text="Invoice Requested" iconFont="credit_card" color="light-blue" hideText={props.hideText}/> 
                : null
            }
        </div>
    )
}

export default TicketStatuses