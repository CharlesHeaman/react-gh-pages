import Label from "../../../../../../../components/ui/General/Label/Label"
import CustomerLink from "../../../../../../../components/ui/Links/CustomerLink"
import TicketLink from "../../../../../../../components/ui/Links/TicketLink"
import { CustomerResponseData } from "../../../../../../../types/customers.types"
import { TicketResponseData } from "../../../../../../../types/tickets.types"
import { TimegridTicketTimeResponseData } from "../../../../../../../types/timegridTicketTime.types"

const TimeTableTicketRow = (props: {
    ticket: TicketResponseData,
    timegridTicketTime: TimegridTicketTimeResponseData | undefined,
    customer: CustomerResponseData | undefined,
    isAccounts: boolean
}) => {
    return (
        <tr>
            <td>
                <TicketLink
                    id={props.ticket.id} 
                    ticketType={props.ticket.data.ticket_type} 
                    parentID={props.ticket.data.parent_ticket_id} 
                    deptID={props.ticket.data.department_id} 
                    number={props.ticket.data.number} 
                    suffix={props.ticket.data.suffix}
                />
            </td>
            {props.timegridTicketTime ? 
                <>
                    {!props.isAccounts ?
                        <>
                            <td className="text-left" >
                                {props.customer && <CustomerLink
                                    customerName={props.customer.data.name}
                                    customerID={props.customer.id}
                                />}
                            </td>
                            <td>
                                <p className="no-wrap">{props.timegridTicketTime.data.on_site_time} hrs</p>
                            </td>
                            <td>
                                <p className="no-wrap">{props.timegridTicketTime.data.travel_time} hrs</p>
                            </td>
                            <td>
                                {props.timegridTicketTime.data.is_own_miles ? 
                                    <Label 
                                        iconFont="local_gas_station" 
                                        color={"purple"} 
                                        text={`${props.timegridTicketTime.data.mileage} mi`} 
                                        title={`${props.timegridTicketTime.data.mileage} Own Miles`}
                                    /> :
                                    <p className="no-wrap">{props.timegridTicketTime.data.mileage} mi</p>
                                }
                            </td>
                            <td>
                                <p className="no-wrap">£{props.timegridTicketTime.data.expenses}</p>
                            </td>
                        </> :
                        <>
                            <td>
                                <p className="no-wrap">{props.timegridTicketTime.data.on_site_time + props.timegridTicketTime.data.travel_time} hrs</p>
                            </td>
                            <td>
                                <p className="no-wrap">{props.timegridTicketTime.data.is_own_miles ? props.timegridTicketTime.data.mileage : 0} mi</p>
                            </td>

                        </>
                    }
                </> :
                <>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </>
            }
        </tr>
    )
}

export default TimeTableTicketRow