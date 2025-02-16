import { CustomerResponseData } from "../../../../../types/customers.types"
import { DepartmentResponseData } from "../../../../../types/department.types"
import { SiteResponseData } from "../../../../../types/sites.types"
import { TicketResponseData } from "../../../../../types/tickets.types"
import { TimegridResponseData } from "../../../../../types/timegrid.types"
import { TimegridTicketTimeResponseData } from "../../../../../types/timegridTicketTime.types"
import { UserResponseData } from "../../../../../types/user.types"
import findCustomer from "../../../../../utils/findCustomer"
import findDepartment from "../../../../../utils/findDepartment"
import findSite from "../../../../../utils/findSite"
import TimegridTicket from "./components/TimegridTicket"

function TimegridTickets(props: {
    userData: UserResponseData,
    ticketData: Array<TicketResponseData>,
    customerData: Array<CustomerResponseData>,
    siteData: Array<SiteResponseData>,
    engineerUserData: Array<UserResponseData>,
    timegridTicketTimeData: Array<TimegridTicketTimeResponseData>,
    engineerTimegridData: Array<TimegridResponseData>,
    departments: Array<DepartmentResponseData>
}) {
    return (
        <>
            <section>
                <h2>Assigned Tickets</h2>
                {props.ticketData.map((ticket, index) => 
                    <section key={index}>
                        <TimegridTicket
                            user={props.userData}
                            ticket={ticket}
                            customer={findCustomer(props.customerData, ticket.data.customer_id)}
                            site={findSite(props.siteData, ticket.data.site_id)}
                            users={props.engineerUserData}
                            timegrids={props.engineerTimegridData}
                            timegridTicketTime={props.timegridTicketTimeData}
                            department={findDepartment(props.departments, ticket.data.department_id)}
                        />
                    </section>
                )}
            </section>
            <hr/>
        </>
    )
}

export default TimegridTickets