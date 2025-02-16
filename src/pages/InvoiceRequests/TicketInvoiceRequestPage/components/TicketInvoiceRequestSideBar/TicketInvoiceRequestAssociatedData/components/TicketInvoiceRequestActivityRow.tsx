import UserLink from "../../../../../../../components/ui/Links/UserLink"
import { TicketInvoiceRequestActivityResponseData } from "../../../../../../../types/ticketInvoiceRequestActivity.types"
import { UserResponseData } from "../../../../../../../types/user.types"
import formatDateTimestamp from "../../../../../../../utils/formatTimestamp"
import InvoiceRequestActivityLabel from "./InvoiceRequestActivityLabel"

const TicketInvoiceRequestActivityRow = (props: {
    ticketInvoiceRequestActivity: TicketInvoiceRequestActivityResponseData,
    user: UserResponseData | undefined,
}) => {
    return (
        <tr>
            <td><InvoiceRequestActivityLabel action={props.ticketInvoiceRequestActivity.data.type}/></td>
            <td className="text-left">{props.user ? <UserLink username={props.user.data.username} firstName={props.user.data.first_name} lastName={props.user.data.last_name}/> : 'Unknown'}</td>
            <td>{formatDateTimestamp(props.ticketInvoiceRequestActivity.data.created_at)}</td>
        </tr>
    )
}

export default TicketInvoiceRequestActivityRow