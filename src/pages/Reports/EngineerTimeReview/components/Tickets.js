import QuotedTime from "../../../../components/QuotedTime"
import GridItem from "../../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../../components/ui/Containers/InfoGrid/InfoGrid"
import InnerContainer from "../../../../components/ui/Containers/InnerContainer/InnerContainer"
import Label from "../../../../components/ui/General/Label/Label"
import TicketLink from "../../../../components/ui/Links/TicketLink"
import formatHours from "../../../../utils/formatHours"
import formatMiles from "../../../../utils/formatMiles"
import getInvoiceTypeLabel from "../../../../utils/getInvoiceTypeLabel"
import TicketStatus from "../../../Tickets/components/TicketStatus/TicketStatus"
import Difference from "./Difference"

function Tickets(props) {
    return (
        props.engineer.tickets.length > 0 && <InnerContainer title='Ticket Breakdown' startCollapsed collapsible>
            {props.engineer.tickets.map((ticket, index) => 
                <InnerContainer title={
                    <TicketLink
                        id={ticket.id} 
                        parentID={ticket.parentID}
                        number={ticket.number} 
                        suffix={ticket.suffix} 
                        ticketType={ticket.ticketType} 
                        deptID={ticket.deptID}
                    />
                } collapsible key={index}>
                    <InfoGrid>
                        {/* Status */}
                        <GridItem title='Status' span='2'>
                            <TicketStatus 
                                isComplete={ticket.engineer.isComplete} 
                                isJobComplete={ticket.engineer.isJobComplete} 
                                isLocked={ticket.engineer.isLocked} 
                                isStarted={ticket.engineer.isStarted} 
                                isUnableToCarryOut={ticket.engineer.isUnableToCarryOut} 
                                hideIcon
                            />
                        </GridItem>
                        {/* Ticket Type */}
                        <GridItem title='Ticket Type' span={2}>
                            {ticket.ticketType == 0 ?
                                <Label text='Service' color='dark-blue'/> :
                                <Label text='Maintenance' color='light-green'/>
                            }
                        </GridItem>
                        {/* Invoice Type */}
                        <GridItem title='Invoice Type' span={2}>
                            {getInvoiceTypeLabel(ticket.invType, ticket.ticketType)}
                        </GridItem>
                        {/* Customer */}
                        <GridItem title='Customer' span={3}>
                            <p>{ticket.customer.fullName}</p>
                        </GridItem>
                        {/* Job Description */}
                        <GridItem title='Job Description'>
                            <p>{ticket.desc}</p>
                        </GridItem>
                        {/* Materials */}
                        {!ticket.engineer.isUnableToCarryOut && <GridItem title='Materials Used' span={3}>
                            <p>{ticket.engineer.materials}</p>
                        </GridItem>}
                        {/* Est Time */}
                        <GridItem title='Estimated Time' span={2}>
                            <p>{ticket.estTime} hrs</p>
                        </GridItem>
                        {/* Quote */}
                        {ticket.quotes.parent.id > 0 && 
                            <GridItem title='Quote Time'>
                                <QuotedTime quoteData={ticket.quotes.parent} quotedTime={
                                    props.quoteData.find((quotedTime) => quotedTime.quoteID == ticket.quotes.parent.id && quotedTime.equipmentID == ticket.equipment.id) && 
                                        props.quoteData.find((quotedTime) => quotedTime.quoteID == ticket.quotes.parent.id && quotedTime.equipmentID == ticket.equipment.id).quotedTime
                                }/>
                            </GridItem>
                        }
                        <GridItem title='Ticket Time'>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Type</th>
                                        <th>On-Site</th>
                                        <th>Travel</th>
                                        <th>Miles</th>
                                        <th>Expenses</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* Timegrid */}
                                    <tr>
                                        <td>Timegrid</td>
                                        <td>{ticket.engineer.engineers.find(engineer => engineer.isUser).onSite} hrs</td>
                                        <td>{ticket.engineer.engineers.find(engineer => engineer.isUser).travel} hrs</td>
                                        <td>{ticket.engineer.engineers.find(engineer => engineer.isUser).miles} mi</td>
                                        <td>£{ticket.engineer.engineers.find(engineer => engineer.isUser).expenses}</td>
                                    </tr>
                                    {/* Ticket */}
                                    <tr>
                                        <td>Ticket</td>
                                        <td>{ticket.ticketTimeTotals.onSite} hrs</td>
                                        <td>{ticket.ticketTimeTotals.travel} hrs</td>
                                        <td>{ticket.ticketTimeTotals.miles} mi</td>
                                        <td>£{ticket.ticketTimeTotals.expenses}</td>
                                    </tr>
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <th>Difference</th>
                                        <th>
                                            <Difference value={formatHours(ticket.ticketTimeTotals.onSite - ticket.engineer.engineers.find(engineer => engineer.isUser).onSite)} suffix=' hrs'/>
                                        </th>
                                        <th>
                                            <Difference value={formatHours(ticket.ticketTimeTotals.travel - ticket.engineer.engineers.find(engineer => engineer.isUser).travel)} suffix=' hrs'/>
                                        </th>
                                        <th>
                                            <Difference value={formatMiles(ticket.ticketTimeTotals.miles - ticket.engineer.engineers.find(engineer => engineer.isUser).miles)} suffix=' mi'/>
                                        </th>
                                        <th>
                                            <Difference value={ticket.ticketTimeTotals.expenses - ticket.engineer.engineers.find(engineer => engineer.isUser).expenses} prefix='£'/>
                                        </th>
                                    </tr>
                                </tfoot>
                            </table>
                        </GridItem>     
                    </InfoGrid>
                </InnerContainer>
            )}
        </InnerContainer>
    )
}

export default Tickets