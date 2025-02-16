import JobLink from "../../../components/ui/Links/JobLink"
import NewCustomerLink from "../../../components/ui/Links/NewCustomerLink"
import UserLink from "../../../components/ui/Links/UserLink"
import { CustomerResponseData } from "../../../types/customers.types"
import { DepartmentResponseData } from "../../../types/department.types"
import { JobInvoiceRequestResponseData } from "../../../types/JobInvoiceRequest"
import { QuoteResponseData } from "../../../types/quote.types"
import { UserResponseData } from "../../../types/user.types"
import formatDate from "../../../utils/formatDate"
import formatMoney from "../../../utils/formatMoney"
import JobStatuses from "../../Jobs/components/JobStatuses"
import NewQuoteLink from "./NewQuoteLink"
import QuoteStatusLabel from "./QuoteStatusLabel"
import QuoteTypeLabel from "./QuoteTypeLabel"

const QuoteRow = (props: {
    quote: QuoteResponseData,
    department: DepartmentResponseData | undefined,
    user: UserResponseData | undefined,
    customer: CustomerResponseData | undefined,
    // ticket: TicketResponseData | undefined,
    invoiceRequest: JobInvoiceRequestResponseData | undefined,
    hideCustomer?: boolean,
    isJobs?: boolean
}) => {
    return (
        <tr>
            <td className="text-left">{!props.isJobs ? 
                <NewQuoteLink 
                    number={props.quote.data.number}
                    suffix={props.quote.data.revision_number} 
                    departmentName={props.department ? props.department.data.name : ''}                
                /> : 
                <JobLink departmentName={props.department ? props.department.data.name : ''} number={props.quote.data.number}/>
}           </td>
            {!props.isJobs ? <>
                <td><QuoteTypeLabel 
                    isReactive={props.quote.data.is_reactive}
                    isMaintenance={props.quote.data.is_maintenance} 
                    isProject={props.quote.data.is_project} 
                    hideText
                /></td>
                <td className="text-left">{props.user ? 
                    <UserLink 
                        username={props.user.data.username} 
                        firstName={props.user.data.first_name} 
                        lastName={props.user.data.last_name}
                    /> : 
                    props.quote.data.originator
                }</td>
                {/* <td className="text-left">{props.ticket && props.department ? <TicketLink 
                    ticket={props.ticket}
                    departmentName={props.department.data.name}
                /> : null}</td> */}
            </> : null}
            {!props.hideCustomer ? 
                <td className="text-left">{props.customer ? 
                    <NewCustomerLink 
                        code={props.customer.data.code} 
                        name={props.customer.data.name}
                    /> : 
                    props.quote.data.customer
                }</td>
            : null}
            <td className="text-left">{props.quote.data.description}</td>
            <td className="text-right">{formatMoney(props.quote.data.value)}</td>
            <td>{formatDate(props.quote.data.created_at)}</td>
            <td>{!props.isJobs ? 
                <QuoteStatusLabel status={props.quote.data.status} hideText/> :
                <JobStatuses job={props.quote} invoiceRequest={props.invoiceRequest} hideText/>
            }</td>
        </tr>
    )
}

export default QuoteRow