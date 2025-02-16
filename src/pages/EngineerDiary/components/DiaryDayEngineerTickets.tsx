import InnerContainer from "../../../components/ui/Containers/InnerContainer/InnerContainer"
import NoneFound from "../../../components/ui/General/NoneFound/NoneFound"
import { CustomerResponseData } from "../../../types/customers.types"
import { DepartmentResponseData } from "../../../types/department.types"
import { SiteResponseData } from "../../../types/sites.types"
import { TicketInvoiceRequestResponseData } from "../../../types/TicketInvoiceRequest.types"
import { TicketResponseData } from "../../../types/tickets.types"
import findCustomer from "../../../utils/findCustomer"
import findDepartment from "../../../utils/findDepartment"
import findSite from "../../../utils/findSite"
import findTicketInvoiceRequest from "../../../utils/findTicketInvoiceRequest"
import TicketRow from "../../Tickets/components/TicketRow"

const DiaryDayEngineerTickets = (props: {
    tickets: Array<TicketResponseData>,
    departments: Array<DepartmentResponseData>,
    customers: Array<CustomerResponseData>,
    sites: Array<SiteResponseData>,
    invoiceRequests: Array<TicketInvoiceRequestResponseData>,
}) => {
    return (
        <InnerContainer>
            {props.tickets.length > 0 ? 
                <div className="table-wrapper">
                    <table>
                        <tbody>
                            {props.tickets.map((ticket, index) => 
                                <TicketRow
                                    ticket={ticket}
                                    customer={findCustomer(props.customers, ticket.data.customer_id)}
                                    site={findSite(props.sites, ticket.data.site_id)}
                                    invoiceRequest={findTicketInvoiceRequest(props.invoiceRequests, ticket.data.number, ticket.data.department_id)}
                                    department={findDepartment(props.departments, ticket.data.department_id)}                                
                                    hideVisitDate
                                    key={index} 
                                />
                            )}
                        </tbody>
                    </table>
                </div> : 
                <NoneFound 
                    iconFont={"local_activity"} 
                    text={"No tickets found"}
                    small
                />
            }   
        </InnerContainer>
    )
}

export default DiaryDayEngineerTickets