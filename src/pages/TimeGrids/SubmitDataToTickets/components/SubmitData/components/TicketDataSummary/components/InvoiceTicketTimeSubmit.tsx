import Label from "../../../../../../../../components/ui/General/Label/Label"
import { DepartmentResponseData } from "../../../../../../../../types/department.types"
import { TicketResponseData } from "../../../../../../../../types/tickets.types"
import formatDate from "../../../../../../../../utils/formatDate"
import formatHours from "../../../../../../../../utils/formatHours"
import formatMiles from "../../../../../../../../utils/formatMiles"
import formatMoney from "../../../../../../../../utils/formatMoney"
import InvoiceTicketTimeRateLabel from "../../../../../../../Invoices/InvoiceTicketTimeRateLabel"
import { InvoiceTicketTime } from "../../../../../ProcessTimegridPage"
import getInvoiceTicketTime from "../utils/getInvoiceTicketTime"

const InvoiceTicketTimeSubmit = (props: {
    department: DepartmentResponseData,
    ticket: TicketResponseData,
    invoiceTicketTime: Array<InvoiceTicketTime>
}) => {
    return (
        <div className="table-wrapper">
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Type</th>
                        <th>Rate</th>
                        <th>On-site</th>
                        <th>Travel</th>
                        <th>Mileage</th>
                        <th>Expenses</th>
                    </tr>
                </thead>
                <tbody>
                    {getInvoiceTicketTime(props.invoiceTicketTime.find(ticketTime => ticketTime.ticket_id === props.ticket.id && ticketTime.ticket_type === props.ticket.data.ticket_type), props.department.data.day_max_hours).map((ticketTime) => 
                        <tr>
                            <td>{formatDate(props.ticket.data.visit_date)}</td>
                            <td><InvoiceTicketTimeRateLabel isOverTime={ticketTime.is_over_time} isDoubleTime={false}/></td>
                            <td>{!ticketTime.is_mate_rate ? 
                                <Label iconFont="person" text="Engineer" color="light-green"/> :
                                <Label iconFont="person_add" text="Mate" color="purple"/>
                            }</td>
                            <td>{formatHours(ticketTime.on_site_time)} hrs</td>
                            <td>{formatHours(ticketTime.travel_time)} hrs</td>
                            <td>{formatMiles(ticketTime.mileage)} mi</td>
                            <td>{formatMoney(ticketTime.expenses)}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default InvoiceTicketTimeSubmit