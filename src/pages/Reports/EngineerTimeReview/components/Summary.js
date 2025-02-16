import InnerContainer from "../../../../components/ui/Containers/InnerContainer/InnerContainer"
import formatHours from "../../../../utils/formatHours"
import formatMiles from "../../../../utils/formatMiles"
import Difference from "./Difference"

function Summary(props) {
    return (
        <InnerContainer title='Summary' collapsible>
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
                        <td>{props.engineer.timegridTotals.onSite + props.engineer.additionalTimeTotals.time} hrs</td>
                        <td>{props.engineer.timegridTotals.travel + props.engineer.additionalTimeTotals.travel} hrs</td>
                        <td>{props.engineer.timegridTotals.miles + props.engineer.additionalTimeTotals.miles} hrs</td>
                        <td>{props.engineer.timegridTotals.expenses + props.engineer.additionalTimeTotals.expenses} hrs</td>
                    </tr>
                    {/* Ticket */}
                    <tr>
                        <td>Ticket</td>
                        <td>{props.engineer.ticketTimeTotals.onSite} hrs</td>
                        <td>{props.engineer.ticketTimeTotals.travel} hrs</td>
                        <td>{props.engineer.ticketTimeTotals.miles} mi</td>
                        <td>£{props.engineer.ticketTimeTotals.expenses}</td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <th>Difference</th>
                        <th>
                            <Difference value={formatHours(props.engineer.differenceTotal.onSite)} suffix=' hrs'/>
                        </th>
                        <th>
                            <Difference value={formatHours(props.engineer.differenceTotal.travel)} suffix=' hrs'/>
                        </th>
                        <th>
                            <Difference value={formatMiles(props.engineer.differenceTotal.miles)} suffix=' mi'/>
                        </th>
                        <th>
                            <Difference value={props.engineer.differenceTotal.expenses} prefix='£'/>
                        </th>
                    </tr>
                </tfoot>
            </table>
        </InnerContainer>
    )
}

export default Summary