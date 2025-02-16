import DepartmentLabel from "../../../../components/ui/Department/DepartmentLabel"
import JobLink from "../../../../components/ui/Links/JobLink"
import NewCustomerLink from "../../../../components/ui/Links/NewCustomerLink"
import UserLink from "../../../../components/ui/Links/UserLink"
import { CustomerResponseData } from "../../../../types/customers.types"
import { DepartmentResponseData } from "../../../../types/department.types"
import { JobInvoiceRequestResponseData } from "../../../../types/JobInvoiceRequest"
import { QuoteResponseData } from "../../../../types/quote.types"
import { UserResponseData } from "../../../../types/user.types"
import findCustomer from "../../../../utils/findCustomer"
import formatDate from "../../../../utils/formatDate"
import formatMoney from "../../../../utils/formatMoney"
import InvoiceRequestStatusLabel from "../../components/InvoiceRequestStatusLabel"
import JobInvoiceRequestLink from "./JobInvoiceRequestLink"

const JobInvoiceRequestRow = (props: {
    jobInvoiceRequest: JobInvoiceRequestResponseData,
    user: UserResponseData | undefined,
    job: QuoteResponseData | undefined,
    department: DepartmentResponseData | undefined,
    customers: Array<CustomerResponseData>
}) => {
    const customer = props.job ? findCustomer(props.customers, props.job.data.customer_id) : undefined
    return (
        <tr>
            <td><JobInvoiceRequestLink id={props.jobInvoiceRequest.id}/></td>
            <td>{props.department ? <DepartmentLabel department={props.department}/> : null}</td>
            <td className="text-left">{props.department ? <JobLink number={props.jobInvoiceRequest.data.job_number} departmentName={props.department.data.name}/> : null}</td>
            <td className="text-left">{customer ? <NewCustomerLink code={customer.data.code} name={customer.data.name}/> : null}</td>
            <td className="text-left">{props.user ? <UserLink username={props.user.data.username} firstName={props.user.data.first_name} lastName={props.user.data.last_name}/> : null}</td>
            <td className="text-right">{formatMoney(props.jobInvoiceRequest.data.requested_value)}</td>
            <td>{formatDate(props.jobInvoiceRequest.data.created_at)}</td>
            <td><InvoiceRequestStatusLabel isProcessed={props.jobInvoiceRequest.data.processed_by_id !== null} isApproved={true} isHolding={false}/></td>
        </tr>
    )
}

export default JobInvoiceRequestRow