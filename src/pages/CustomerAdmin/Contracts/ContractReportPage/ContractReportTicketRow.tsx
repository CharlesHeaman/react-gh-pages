import SiteLink from "../../../../components/ui/Links/SiteLink"
import TicketLink from "../../../../components/ui/Links/TicketLink"
import { DepartmentResponseData } from "../../../../types/department.types"
import { SiteResponseData } from "../../../../types/sites.types"
import { TicketInvoiceRequestResponseData } from "../../../../types/TicketInvoiceRequest.types"
import { TicketResponseData } from "../../../../types/tickets.types"
import formatDate from "../../../../utils/formatDate"
import formatMoney from "../../../../utils/formatMoney"

const ContractReportTicketRow = (props: {
    ticket: TicketResponseData,
    department: DepartmentResponseData | undefined,
    site: SiteResponseData | undefined,
    invoiceRequest: TicketInvoiceRequestResponseData | undefined,
}) => {

    const totalCost = (
        props.invoiceRequest ? 
        props.invoiceRequest.data.labour_cost + 
        props.invoiceRequest.data.mileage_cost + 
        props.invoiceRequest.data.expenses_cost + 
        props.invoiceRequest.data.material_cost + 
        props.invoiceRequest.data.sub_contract_cost + 
        props.invoiceRequest.data.hire_cost 
        : 0
    )

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
                    {props.site ? <SiteLink code={props.site.data.code} name={props.site.data.name}/> : 'Unknown'}
                </div>
            </td>
            <td>{props.ticket.data.visit_date ? formatDate(props.ticket.data.visit_date) : 'Unknown'}</td>
            <td>{props.invoiceRequest ? props.invoiceRequest.data.invoice_number : 'None'}</td>
            <td>{props.invoiceRequest ? formatMoney(totalCost) : 'None'}</td>
            <td>{props.invoiceRequest ? formatMoney(props.invoiceRequest.data.invoice_value) : 'None'}</td>
        </tr>
    )
}

export default ContractReportTicketRow