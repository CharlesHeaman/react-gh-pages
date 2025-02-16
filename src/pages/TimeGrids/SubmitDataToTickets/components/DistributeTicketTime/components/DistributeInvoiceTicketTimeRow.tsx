import { ChangeEvent } from 'react'
import HoursInput from "../../../../../../components/form/HoursInput/HoursInput"
import MilesInput from "../../../../../../components/form/MilesInput/MilesInput"
import MoneyInput from "../../../../../../components/form/MoneyInput/MoneyInput"
import TicketLink from "../../../../../../components/ui/Links/TicketLink"
import { TicketResponseData } from "../../../../../../types/tickets.types"
import { InvoiceTicketTime } from "../../../ProcessTimegridPage"

const DistributeInvoiceTicketTimeRow = (props: {
    ticket: TicketResponseData,
    invoiceTicketTime: InvoiceTicketTime | undefined,
    updateInvoiceTicketData: (event: ChangeEvent<HTMLInputElement>, ticketID: number, ticketType: number) => void,
    updateInvoiceTicketDataRate: (isMateRate: boolean, ticketID: number, ticketType: number) => void
}) => {
    return (
        props.invoiceTicketTime ? <tr>
            <td className="text-left">
                <TicketLink
                    ticket={props.ticket}
                    departmentName=''
                />
            </td>
            <td>
                <select 
                    defaultValue={props.invoiceTicketTime?.is_mate_rate ? "1" : "0"}
                    onChange={(e) => props.updateInvoiceTicketDataRate(e.target.value === "1", props.ticket.id, props.ticket.data.ticket_type)}
                >
                    <option value={0}>Engineer</option>
                    <option value={1}>Mate</option>
                </select>
            </td>
            <td>
                <HoursInput 
                    name={"on_site_time"} 
                    value={props.invoiceTicketTime.on_site_time.toString()} 
                    label={"On-site time"} 
                    updateFunc={(event: ChangeEvent<HTMLInputElement>) => props.updateInvoiceTicketData(event, props.ticket.id, props.ticket.data.ticket_type)} 
                    hasSubmitted={false}
                />
            </td>
            <td>
                <HoursInput 
                    name={"travel_time"} 
                    value={props.invoiceTicketTime.travel_time.toString()} 
                    label={"Travel time"} 
                    updateFunc={(event: ChangeEvent<HTMLInputElement>) => props.updateInvoiceTicketData(event, props.ticket.id, props.ticket.data.ticket_type)} 
                    hasSubmitted={false}
                />
            </td>
            <td>
                <MilesInput 
                    name={"mileage"} 
                    value={props.invoiceTicketTime.mileage.toString()} 
                    label={"Mileage"} 
                    updateFunc={(event) => props.updateInvoiceTicketData(event, props.ticket.id, props.ticket.data.ticket_type)} 
                    hasSubmitted={false}
                />
            </td>
            <td>
                <MoneyInput 
                    name={"expenses"} 
                    value={props.invoiceTicketTime.expenses.toString()} 
                    label={"Expenses"} 
                    updateFunc={(event) => props.updateInvoiceTicketData(event, props.ticket.id, props.ticket.data.ticket_type)} 
                    hasSubmitted={false}
                    maxWidth={75}
                />
            </td>
        </tr> : null
    )
}

export default DistributeInvoiceTicketTimeRow