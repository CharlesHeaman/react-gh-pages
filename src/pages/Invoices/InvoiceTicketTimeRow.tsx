import Label from "../../components/ui/General/Label/Label"
import UserLink from "../../components/ui/Links/UserLink"
import { InvoiceTicketTimeResponseData } from "../../types/invoiceTicketTime.types"
import { UserResponseData } from "../../types/user.types"
import formatDate from "../../utils/formatDate"
import formatHours from "../../utils/formatHours"
import formatMiles from "../../utils/formatMiles"
import formatMoney from "../../utils/formatMoney"
import InvoiceTicketTimeRateLabel from "./InvoiceTicketTimeRateLabel"
import LabourTypeLabel from "./LabourTypeLabel"

const InvoiceTicketTimeRow = (props: {
    invoiceTicketTime: InvoiceTicketTimeResponseData,
    user: UserResponseData | undefined,
}) => {
    return (
        <tr>
            <td>{formatDate(props.invoiceTicketTime.data.date)}</td>
            <td className="text-left">{props.user ? <UserLink username={props.user.data.username} firstName={props.user.data.first_name} lastName={props.user.data.last_name}/> : 'Unknown'}</td>
            <td><InvoiceTicketTimeRateLabel isOverTime={props.invoiceTicketTime.data.is_overtime} isDoubleTime={props.invoiceTicketTime.data.is_double_time} interCompany={props.invoiceTicketTime.data.intercompany_rate}/></td>
            <td><LabourTypeLabel isMate={props.invoiceTicketTime.data.is_mate_rate}/></td>
            <td className="text-right">{formatHours(props.invoiceTicketTime.data.on_site_time)} hrs</td>
            <td className="text-right">{formatHours(props.invoiceTicketTime.data.travel_time)} hrs</td>
            <td className="text-right">{formatMiles(props.invoiceTicketTime.data.mileage)} mi</td>
            <td className="text-right">{formatMoney(props.invoiceTicketTime.data.expenses)}</td>
        </tr>
    )
}

export default InvoiceTicketTimeRow