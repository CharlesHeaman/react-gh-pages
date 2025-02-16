import NewCustomerLink from "../../../../components/ui/Links/NewCustomerLink"
import TicketLink from "../../../../components/ui/Links/TicketLink"
import UserLink from "../../../../components/ui/Links/UserLink"
import { CustomerResponseData } from "../../../../types/customers.types"
import { EngineerEquipmentDetailsResponseData } from "../../../../types/engineerEquipmentDetails.types"
import { TicketResponseData } from "../../../../types/tickets.types"
import { UserResponseData } from "../../../../types/user.types"
import findCustomer from "../../../../utils/findCustomer"
import formatDate from "../../../../utils/formatDate"
import EngineerEquipmentDetailsLink from "../../components/EngineerEquipmentDetailsLink"
import EngineerEquipmentDetailsStatus from "../../components/EngineerEquipmentDetailsStatus"

const EngineerEquipmentDetailsRow = (props: {
    engineerEquipmentDetails: EngineerEquipmentDetailsResponseData,
    user: UserResponseData | undefined,
    ticket: TicketResponseData | undefined,
    customers: Array<CustomerResponseData>,
    departmentName: string | undefined,
    hideTicket?: boolean,
}) => {
    const customer = findCustomer(props.customers, props.ticket ? props.ticket.data.customer_id : 0);
    
    return (
        <tr>
            <td className="text-left"><EngineerEquipmentDetailsLink engineerEquipmentDetailsID={props.engineerEquipmentDetails.id} departmentName={props.departmentName}/></td>
            {!props.hideTicket ?
                <td className="text-left">{props.ticket && props.departmentName ? <TicketLink 
                    ticket={props.ticket}
                    departmentName={props.departmentName}
                />
                 : null}</td> :
                null
            }
            {!props.hideTicket ?
                <td className="text-left">{customer ? <NewCustomerLink code={customer.data.code} name={customer.data.name}/> : undefined}</td> :
                null
            }
            <td className="text-left">{props.user ? <UserLink username={props.user.data.username} firstName={props.user.data.first_name} lastName={props.user.data.last_name}/> : null}</td>
            <td>{formatDate(props.engineerEquipmentDetails.data.created_at)}</td>
            <td><EngineerEquipmentDetailsStatus isProcessed={props.engineerEquipmentDetails.data.is_processed} hideText/></td>
        </tr>
    )
}

export default EngineerEquipmentDetailsRow