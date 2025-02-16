import NewCustomerLink from "../../../components/ui/Links/NewCustomerLink"
import TicketLink from "../../../components/ui/Links/TicketLink"
import UserLink from "../../../components/ui/Links/UserLink"
import { CustomerResponseData } from "../../../types/customers.types"
import { PostCompletionChangeRequestResponseData } from "../../../types/postCompletionChangeRequets.types"
import { TicketResponseData } from "../../../types/tickets.types"
import { UserResponseData } from "../../../types/user.types"
import findCustomer from "../../../utils/findCustomer"
import formatDate from "../../../utils/formatDate"
import PostCompletionChangeRequestLabel from "../../ReviewPostCompletionChangeRequests/components/PostCompletionChangeRequestLabel/PostCompletionChangeRequestLabel"
import PostCompletionChangeRequestLink from "./PostCompletionChangeRequestLink"

const PostCompletionChangeRequestRow = (props: {
    postCompletionChangeRequest: PostCompletionChangeRequestResponseData
    user: UserResponseData | undefined,
    ticket: TicketResponseData | undefined,
    customers: Array<CustomerResponseData>,
    departmentName: string | undefined,
    hideTicket?: boolean,
}) => {
    const customer = findCustomer(props.customers, props.ticket ? props.ticket.data.customer_id : 0);

    return (
        <tr>
            <td className="text-left"><PostCompletionChangeRequestLink postCompletionChangeRequestID={props.postCompletionChangeRequest.id} departmentName={props.departmentName}/></td>
            {!props.hideTicket ?
                <td className="text-left">{props.ticket && props.departmentName ? <TicketLink 
                        ticket={props.ticket}
                        departmentName={props.departmentName}
                    /> : null}</td> :
                null
            }
            {!props.hideTicket ?
                <td className="text-left">{customer ? <NewCustomerLink code={customer.data.code} name={customer.data.name}/> : undefined}</td> :
                null
            }
            <td className="text-left">{props.user ? <UserLink username={props.user.data.username} firstName={props.user.data.first_name} lastName={props.user.data.last_name}/> : null}</td>
            <td>{formatDate(props.postCompletionChangeRequest.data.created_at)}</td>
            <td><PostCompletionChangeRequestLabel status={props.postCompletionChangeRequest.data.status} hideText/></td>
        </tr>
    )
}

export default PostCompletionChangeRequestRow