import GridItem from "../../../../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../../../../components/ui/Containers/InfoGrid/InfoGrid"
import TicketLink from "../../../../../../components/ui/Links/TicketLink"
import { CustomerResponseData } from "../../../../../../types/customers.types"
import { TicketResponseData } from "../../../../../../types/tickets.types"
import { TimegridTicketTimeResponseData } from "../../../../../../types/timegridTicketTime.types"

const TimegridData = (props: {
    timegridTicketTime: Array<TimegridTicketTimeResponseData>
    userID: number,
    customerData: Array<CustomerResponseData>,
    ticketData: Array<TicketResponseData>
}) => {
    
    const getReducedUserTimegridTicketTime = () => {
        return getUserTimegridTicketTime().reduce((reducedTimegridTicketTime: ReducedTimegridTicketTime, timegridTicketTime) => {
            return { 
                on_site_time: reducedTimegridTicketTime.on_site_time + timegridTicketTime.data.on_site_time,
                travel_time: reducedTimegridTicketTime.travel_time + timegridTicketTime.data.travel_time,
                mileage: reducedTimegridTicketTime.mileage + timegridTicketTime.data.mileage,
                expenses: reducedTimegridTicketTime.expenses + timegridTicketTime.data.expenses
            }
        }, {
            on_site_time: 0,
            travel_time: 0,
            mileage: 0,
            expenses: 0
        })
    }

    const getUserTimegridTicketTime = () => {
        return props.timegridTicketTime.filter((timegridTicketTime) => timegridTicketTime.data.user_id === props.userID);
    }

    const getTicketTimegridTicketTime = (ticketID: number, ticketType: number, userID: number) => {
        return props.timegridTicketTime.find((timegridTicketTime) => 
            timegridTicketTime.data.ticket_id === ticketID && 
            timegridTicketTime.data.ticket_type === ticketType && 
            timegridTicketTime.data.user_id === userID 
        );
    }

    interface ReducedTimegridTicketTime {
        on_site_time: number,
        travel_time: number,
        mileage: number,
        expenses: number
    }

    return (
        <section>
            <h2>Timegrid Data</h2>
            <InfoGrid>
                <GridItem>
                    The time submitted on the engineers timegrid.
                </GridItem>
                <GridItem>
                    <table>
                        <thead>
                            <tr>
                                <th>Ticket</th>
                                <th>Customer</th>
                                <th>On-site</th>
                                <th>Travel</th>
                                <th>Miles</th>
                                <th>Expenses</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.ticketData.map((ticket, index) => 
                                <tr key={index}>
                                    <td>
                                        <TicketLink
                                            id={ticket.id} 
                                            number={ticket.data.number} 
                                            suffix={ticket.data.suffix} 
                                            parentID={ticket.data.parent_ticket_id}
                                            ticketType={ticket.data.ticket_type} 
                                            deptID={ticket.data.department_id}
                                        />
                                    </td>
                                    <td className="text-left">{props.customerData.find((customer) => customer.id === ticket.data.customer_id)?.data.name}</td>
                                    <td>{getTicketTimegridTicketTime(ticket.id, ticket.data.ticket_type, props.userID)?.data.on_site_time} hrs</td>
                                    <td>{getTicketTimegridTicketTime(ticket.id, ticket.data.ticket_type, props.userID)?.data.travel_time} hrs</td>
                                    <td>{getTicketTimegridTicketTime(ticket.id, ticket.data.ticket_type, props.userID)?.data.mileage} mi</td>
                                    <td>£{getTicketTimegridTicketTime(ticket.id, ticket.data.ticket_type, props.userID)?.data.expenses}</td>
                                </tr>
                            )}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td></td>
                                <td></td>
                                <th>{getReducedUserTimegridTicketTime().on_site_time} hrs</th>
                                <th>{getReducedUserTimegridTicketTime().travel_time} hrs</th>
                                <th>{getReducedUserTimegridTicketTime().mileage} mi </th>
                                <th>£{getReducedUserTimegridTicketTime().expenses}</th>
                            </tr>
                        </tfoot>
                    </table>
                </GridItem>
            </InfoGrid>
        </section>
    )
}

export default TimegridData