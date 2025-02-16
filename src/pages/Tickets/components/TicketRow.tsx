import NewCustomerLink from "../../../components/ui/Links/NewCustomerLink"
import SiteLink from "../../../components/ui/Links/SiteLink"
import TicketLink from "../../../components/ui/Links/TicketLink"
import { CustomerResponseData } from "../../../types/customers.types"
import { DepartmentResponseData } from "../../../types/department.types"
import { SiteResponseData } from "../../../types/sites.types"
import { TicketInvoiceRequestResponseData } from "../../../types/TicketInvoiceRequest.types"
import { TicketResponseData } from "../../../types/tickets.types"
import formatDate from "../../../utils/formatDate"
import formatHours from "../../../utils/formatHours"
import TicketStatuses from "../../Ticket/TicketPage/components/TicketStatuses"

const TicketRow = (props: {
    ticket: TicketResponseData,
    department: DepartmentResponseData | undefined,
    customer: CustomerResponseData | undefined,
    site: SiteResponseData | undefined,
    invoiceRequest: TicketInvoiceRequestResponseData | undefined,
    hideVisitDate?: boolean,
}) => {
    return (
        <tr>
            <td className="text-left">{<TicketLink 
                departmentName={props.department ? props.department.data.name : ''} 
                ticket={props.ticket}
            />}</td>
            <td className="text-left">
                <div
                    style={{
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        display: 'block',
                        textOverflow: 'ellipsis',
                        maxWidth: '400px'
                    }}
                >
                    {props.customer ? <NewCustomerLink code={props.customer.data.code} name={props.customer.data.name}/> : null}
                </div>
            </td>
            <td className="text-left">
                <div
                    style={{
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        display: 'block',
                        textOverflow: 'ellipsis',
                        maxWidth: '400px'
                    }}
                >
                    {props.site ? <SiteLink code={props.site.data.code} name={props.site.data.name}/> : 'Unknown'}
                </div>
            </td>
            <td className="text-left">
                <div
                    style={{
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        display: 'block',
                        textOverflow: 'ellipsis',
                        maxWidth: '400px'
                    }}
                >
                    {props.ticket.data.job_description}
                </div>
            </td>
            <td className="text-right">{formatHours(props.ticket.data.estimated_time)} hrs</td>
            {!props.hideVisitDate ? <td>{props.ticket.data.visit_date ? formatDate(props.ticket.data.visit_date) : 'Unknown'}</td> : null}
            <td>
                <TicketStatuses ticket={props.ticket} invoiceRequest={props.invoiceRequest} hideText hideType/>
            </td>
        </tr>
    )
}

export default TicketRow