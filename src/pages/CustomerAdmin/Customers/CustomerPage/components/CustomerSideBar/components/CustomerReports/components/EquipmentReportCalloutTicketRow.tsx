import TicketLink from "../../../../../../../../../components/ui/Links/TicketLink"
import { TicketInvoiceRequestResponseData } from "../../../../../../../../../types/TicketInvoiceRequest.types"
import { TicketResponseData } from "../../../../../../../../../types/tickets.types"
import formatDate from "../../../../../../../../../utils/formatDate"
import formatMoney from "../../../../../../../../../utils/formatMoney"

const EquipmentReportCalloutTicketRow = (props: {
    ticket: TicketResponseData,
    invoiceRequest: TicketInvoiceRequestResponseData | undefined,
}) => {
    return (
        <tr>
            <td>{formatDate(props.ticket.data.visit_date)}</td>
            <td className="text-left">{<TicketLink 
                ticketType={props.ticket.data.ticket_type}number={props.ticket.data.number} suffix={props.ticket.data.suffix}
            />}</td>
            <td className="text-left">{props.ticket.data.job_description}</td>
            <td className="text-right">{props.invoiceRequest && formatMoney(props.invoiceRequest.data.invoice_value)}</td>
        </tr>
    )
}

export default EquipmentReportCalloutTicketRow