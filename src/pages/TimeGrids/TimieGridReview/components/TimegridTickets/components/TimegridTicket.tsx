import GridItem from "../../../../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../../../../components/ui/Containers/InfoGrid/InfoGrid"
import InnerContainer from "../../../../../../components/ui/Containers/InnerContainer/InnerContainer"
import NewCustomerLink from "../../../../../../components/ui/Links/NewCustomerLink"
import SiteLink from "../../../../../../components/ui/Links/SiteLink"
import TicketLink from "../../../../../../components/ui/Links/TicketLink"
import { CustomerResponseData } from "../../../../../../types/customers.types"
import { DepartmentResponseData } from "../../../../../../types/department.types"
import { SiteResponseData } from "../../../../../../types/sites.types"
import { TicketResponseData } from "../../../../../../types/tickets.types"
import { TimegridResponseData } from "../../../../../../types/timegrid.types"
import { TimegridTicketTimeResponseData } from "../../../../../../types/timegridTicketTime.types"
import { UserResponseData } from "../../../../../../types/user.types"
import findUser from "../../../../../../utils/findUser"
import findUserTimegrid from "../../../../../../utils/findUserTimegrid"
import TicketEngineerTicketTime from "./TicketEngineerTicketTime"

const TimegridTicket = (props: {
    user: UserResponseData,
    ticket: TicketResponseData,
    customer: CustomerResponseData | undefined,
    site: SiteResponseData | undefined,
    users: Array<UserResponseData>,
    timegrids: Array<TimegridResponseData>,
    timegridTicketTime: Array<TimegridTicketTimeResponseData>,
    department: DepartmentResponseData | undefined
}) => {
    const getTicketTimegridTicketTime = (ticketID: number, ticketType: number, userID: number) => {
        return props.timegridTicketTime.find((timegridTicketTime) => 
            timegridTicketTime.data.ticket_id === ticketID && 
            timegridTicketTime.data.ticket_type === ticketType && 
            timegridTicketTime.data.user_id === userID 
        );
    }
    
    return (
        <InnerContainer
            title={props.ticket && props.department ? <TicketLink 
                ticket={props.ticket}
                departmentName={props.department.data.name} 
            /> : <></>}
            smallHeader
        >
            <InfoGrid>
                <GridItem title='Customer' span={3}>
                    {props.customer ? <p><NewCustomerLink code={props.customer.data.code} name={props.customer.data.name}/></p> : null}
                </GridItem>
                <GridItem title='Site' span={3}>
                    {props.site ? <p><SiteLink code={props.site.data.code} name={props.site.data.name}/></p> : null}
                </GridItem>
                {/* Job Description */}
                <GridItem title='Job Description'>
                    <p>{props.ticket.data.job_description}</p>
                </GridItem>
                {/* Ticket Time */}
                {!props.ticket.data.is_unable_to_attend ? 
                    <GridItem title='Timegrid Time'>
                        <div className="table-wrapper">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Engineer</th>
                                        <th>On-site</th>
                                        <th>Travel</th>
                                        <th>Miles</th>
                                        <th>Expenses</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {props.ticket.data.engineers.sort((engineerOne, _) => engineerOne.user_id === props.user.id ? 0 : 1).map((engineer, index) =>
                                        <TicketEngineerTicketTime
                                            user={findUser(props.users, engineer.user_id)}
                                            timegrid={findUserTimegrid(props.timegrids, engineer.user_id)}
                                            timegridTicketTime={getTicketTimegridTicketTime(props.ticket.id, props.ticket.data.ticket_type, engineer.user_id)}
                                            key={index}
                                        />
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </GridItem> :
                    <GridItem title='Unable to Attend Reason'>
                        <p>{props.ticket.data.unable_to_attend_reason}</p>
                    </GridItem>
                }
            </InfoGrid>
        </InnerContainer>
    )
}

export default TimegridTicket