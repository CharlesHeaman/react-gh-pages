import NewCustomerLink from "../../../components/ui/Links/NewCustomerLink"
import TicketLink from "../../../components/ui/Links/TicketLink"
import UserLink from "../../../components/ui/Links/UserLink"
import { CustomerResponseData } from "../../../types/customers.types"
import { DepartmentResponseData } from "../../../types/department.types"
import { StoresNotificationResponseData } from "../../../types/storesNotifications.types"
import { TicketResponseData } from "../../../types/tickets.types"
import { UserResponseData } from "../../../types/user.types"
import findCustomer from "../../../utils/findCustomer"
import findDepartment from "../../../utils/findDepartment"
import formatDate from "../../../utils/formatDate"
import StoresNotificationLabel from "../../TimeGrids/TimieGridReview/components/StoresNotificationLabel"
import StoresNotificationLink from "./StoresNotificationLink"

const StoresNotificationRow = (props: {
    storesNotification: StoresNotificationResponseData,
    user: UserResponseData | undefined,
    ticket: TicketResponseData | undefined,
    customers: Array<CustomerResponseData>,
    departments: Array<DepartmentResponseData>
    hideTicket?: boolean,
}) => {
    const department = findDepartment(props.departments, props.ticket ? props.ticket.data.department_id : 0);
    const customer = findCustomer(props.customers, props.ticket ? props.ticket.data.customer_id : 0);

    return (
        <tr>
            <td><StoresNotificationLink code={props.storesNotification.id}/></td>
            {!props.hideTicket ?
                <td className="text-left">{props.ticket && department ? <TicketLink 
                    ticket={props.ticket}
                    departmentName={department.data.name}
                /> : null}</td> :
                null 
            }
                        {!props.hideTicket ?
                <td className="text-left">{customer ? <NewCustomerLink code={customer.data.code} name={customer.data.name}/> : undefined}</td> :
                null
            }
            <td className="text-left">{props.user ? <UserLink username={props.user.data.username} firstName={props.user.data.first_name} lastName={props.user.data.last_name}/> : null}</td>
            <td>{formatDate(props.storesNotification.data.created_at)}</td>
            <td><StoresNotificationLabel status={props.storesNotification.data.status} hideText/></td>
        </tr>
    )
}

export default StoresNotificationRow