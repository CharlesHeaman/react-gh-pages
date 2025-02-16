import InputLabelWrap from "../../../../components/form/InputLabelWrap/InputLabelWrap";
import TicketLink from "../../../../components/ui/Links/TicketLink";
import formatHours from "../../../../utils/formatHours";
import formatMiles from "../../../../utils/formatMiles";
import getInvoiceTypeLabel from "../../../../utils/getInvoiceTypeLabel";
import sumTicketProperty from "../utils/sumTicketProperty";
import SumComparision from "./SumComparision";

function EngineerTime(props) {
    function sumSubmitProperty(tickets, name) {
        return tickets.reduce((sum, ticket) => {
            if (!isNaN(parseFloat(ticket[name]))) {
                return sum + parseFloat(ticket[name]);
            } 
            return sum
        }, 0)
    }

    return (
        <table>
            <thead>
                <tr>
                    <th>Ticket</th>
                    <th>Invoice Type</th>
                    <th>On-Site</th>
                    <th>Travel</th>
                    <th>Miles</th>
                    <th>Expenses</th>
                </tr>
            </thead>
            <tbody>
                {props.tickets.map((ticket, index) =>
                    <tr key={index}>
                        <td>
                            <TicketLink 
                                id={ticket.id} 
                                parentID={ticket.parentID}
                                number={ticket.number} 
                                suffix={ticket.suffix} 
                                ticketType={ticket.ticketType} 
                                deptID={ticket.deptID}
                            />
                        </td>
                        <td>
                            {getInvoiceTypeLabel(ticket.invType, ticket.ticketType)}
                        </td>
                        <td>
                            <InputLabelWrap suffix='hrs'>
                                <input type='number' name='onSite' value={props.submitData[index].onSite} onChange={(e) => props.updateSubmitData(e, index)}/>
                            </InputLabelWrap>
                        </td>
                        <td>
                            <InputLabelWrap suffix='hrs'>
                                <input type='number' name='travel' value={props.submitData[index].travel} onChange={(e) => props.updateSubmitData(e, index)}/>
                            </InputLabelWrap>
                        </td>
                        <td>
                            <InputLabelWrap suffix='mi'>
                                <input type='number' name='miles' value={props.submitData[index].miles} onChange={(e) => props.updateSubmitData(e, index)}/>
                            </InputLabelWrap>
                        </td>
                        <td>
                            <InputLabelWrap prefix='£'>
                                <input type='number' name='expenses' value={props.submitData[index].expenses} onChange={(e) => props.updateSubmitData(e, index)}/>
                            </InputLabelWrap>
                        </td>
                    </tr>
                )}
            </tbody>
            <tfoot>
                <tr>
                    <td></td>
                    <td></td>
                    <th>
                        <SumComparision 
                            total={formatHours(sumSubmitProperty(props.submitData, 'onSite'))} 
                            match={formatHours(sumTicketProperty(props.tickets, 'onSite'))} 
                            max={formatHours(sumTicketProperty(props.tickets, 'onSite'))}
                            min={formatHours(sumTicketProperty(props.tickets, 'onSite'))}
                            suffix=' hrs'
                        />
                    </th>
                    <th>
                        <SumComparision 
                            total={formatHours(sumSubmitProperty(props.submitData, 'travel'))} 
                            match={formatHours(sumTicketProperty(props.tickets, 'travel'))} 
                            max={Math.max(formatHours(sumTicketProperty(props.tickets, 'travel')), formatHours(props.maxDuration))}
                            min={Math.min(formatHours(sumTicketProperty(props.tickets, 'travel')), formatHours(props.maxDuration))}
                            suffix=' hrs'
                        />
                    </th>
                    <th>
                        <SumComparision 
                            total={formatMiles(sumSubmitProperty(props.submitData, 'miles'))} 
                            match={formatMiles(sumTicketProperty(props.tickets, 'miles'))} 
                            max={Math.max(formatMiles(sumTicketProperty(props.tickets, 'miles')), formatMiles(props.maxDistance))}
                            min={Math.min(formatMiles(sumTicketProperty(props.tickets, 'miles')), formatMiles(props.maxDistance))}
                            suffix=' mi'
                        />
                    </th>
                    <th>
                        <SumComparision 
                            total={formatHours(sumSubmitProperty(props.submitData, 'expenses'))} 
                            match={formatHours(sumTicketProperty(props.tickets, 'expenses'))} 
                            max={formatHours(sumTicketProperty(props.tickets, 'expenses'))}
                            min={formatHours(sumTicketProperty(props.tickets, 'expenses'))}
                            prefix='£'
                        />
                    </th>
                </tr>
            </tfoot>
        </table>
    )
}

export default EngineerTime