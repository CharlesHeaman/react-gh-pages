import DepartmentLabel from "../../../../components/ui/Department/DepartmentLabel"
import NewCustomerLink from "../../../../components/ui/Links/NewCustomerLink"
import TicketLink from "../../../../components/ui/Links/TicketLink"
import UserLink from "../../../../components/ui/Links/UserLink"
import { CustomerResponseData } from "../../../../types/customers.types"
import { DepartmentResponseData } from "../../../../types/department.types"
import { TicketInvoiceRequestResponseData } from "../../../../types/TicketInvoiceRequest.types"
import { TicketResponseData } from "../../../../types/tickets.types"
import { UserResponseData } from "../../../../types/user.types"
import findCustomer from "../../../../utils/findCustomer"
import formatDate from "../../../../utils/formatDate"
import formatMoney from "../../../../utils/formatMoney"
import InvoiceRequestStatusLabel from "../../components/InvoiceRequestStatusLabel"
import TicketInvoiceRequestLink from "./TicketInvoiceRequestLink"

const TicketInvoiceRequestRow = (props: {
    ticketInvoiceRequest: TicketInvoiceRequestResponseData,
    user: UserResponseData | undefined,
    ticket: TicketResponseData | undefined,
    department: DepartmentResponseData | undefined,
    customers: Array<CustomerResponseData>
}) => {
    const customer = props.ticket ? findCustomer(props.customers, props.ticket.data.customer_id) : undefined

    return (
        <tr>
            <td><TicketInvoiceRequestLink id={props.ticketInvoiceRequest.id}/></td>
            <td>{props.department ? <DepartmentLabel department={props.department}/> : null}</td>
            <td className="text-left">{props.ticket && props.department ? <TicketLink 
                departmentName={props.department.data.name}
                ticket={props.ticket}
            /> : null}</td>
            <td className="text-left">{customer ? <NewCustomerLink code={customer.data.code} name={customer.data.name}/> : null}</td>
            <td className="text-left">{props.user ? <UserLink username={props.user.data.username} firstName={props.user.data.first_name} lastName={props.user.data.last_name}/> : null}</td>
            <td className="text-right">{formatMoney(props.ticketInvoiceRequest.data.requested_value)}</td>
            <td>{formatDate(props.ticketInvoiceRequest.data.created_at)}</td>
            <td><InvoiceRequestStatusLabel isProcessed={props.ticketInvoiceRequest.data.is_processed} isApproved={props.ticketInvoiceRequest.data.is_approved} isHolding={props.ticketInvoiceRequest.data.holding_for_purchase_order_number}/></td>
        </tr>
    )
}

export default TicketInvoiceRequestRow