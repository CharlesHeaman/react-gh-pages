import NewCustomerLink from "../../../components/ui/Links/NewCustomerLink"
import TicketLink from "../../../components/ui/Links/TicketLink"
import { CustomerResponseData } from "../../../types/customers.types"
import { RiskAssessmentMethodStatementResponseData } from "../../../types/riskAssessmentMethodStatements.types"
import { TicketResponseData } from "../../../types/tickets.types"
import findCustomer from "../../../utils/findCustomer"
import formatDate from "../../../utils/formatDate"
import RiskAssessmentMethodStatementLink from "./RiskAssessmentMethodStatementLink"

const RiskAssessmentMethodStatementRow = (props: {
    riskAssessmentMethodStatement: RiskAssessmentMethodStatementResponseData,
    ticket: TicketResponseData | undefined,
    customers: Array<CustomerResponseData>
}) => {
    const customer: CustomerResponseData | undefined = findCustomer(props.customers, props.ticket ? props.ticket.data.customer_id : 0);

    return (
        <tr>
            <td className="text-left"><RiskAssessmentMethodStatementLink url={props.riskAssessmentMethodStatement.data.pdf_url}/></td>
            <td className="text-left">{props.ticket ? <TicketLink id={props.ticket.id} ticketType={props.ticket.data.ticket_type} parentID={props.ticket.data.parent_ticket_id} deptID={props.ticket.data.department_id} number={props.ticket.data.number} suffix={props.ticket.data.suffix}/> : null}</td>
            <td className="text-left">{customer ? <NewCustomerLink code={customer.data.code} name={customer.data.name}/> : null}</td>
            <td>{formatDate(props.riskAssessmentMethodStatement.data.created_at)}</td>
        </tr>
    )
}

export default RiskAssessmentMethodStatementRow