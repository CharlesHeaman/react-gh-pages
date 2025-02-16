import UserLink from "../../../../../../../components/ui/Links/UserLink"
import { JobInvoiceRequestActivityResponseData } from "../../../../../../../types/jobInvoiceRequestActivity.types"
import { UserResponseData } from "../../../../../../../types/user.types"
import formatDateTimestamp from "../../../../../../../utils/formatTimestamp"
import InvoiceRequestActivityLabel from "../../../../../TicketInvoiceRequestPage/components/TicketInvoiceRequestSideBar/TicketInvoiceRequestAssociatedData/components/InvoiceRequestActivityLabel"

const JobInvoiceRequestActivityRow = (props: {
    jobInvoiceRequestActivity: JobInvoiceRequestActivityResponseData,
    user: UserResponseData | undefined,
}) => {
    return (
        <tr>
            <td><InvoiceRequestActivityLabel action={props.jobInvoiceRequestActivity.data.type}/></td>
            <td className="text-left">{props.user ? <UserLink username={props.user.data.username} firstName={props.user.data.first_name} lastName={props.user.data.last_name}/> : 'Unknown'}</td>
            <td>{formatDateTimestamp(props.jobInvoiceRequestActivity.data.created_at)}</td>
        </tr>
    )
}

export default JobInvoiceRequestActivityRow