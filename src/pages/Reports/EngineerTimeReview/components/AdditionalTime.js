import InnerContainer from "../../../../components/ui/Containers/InnerContainer/InnerContainer"
import Label from "../../../../components/ui/General/Label/Label"

function AdditionalTime(props) {
    return (
        props.engineer.additionalTime.length > 0 && <InnerContainer title='Additional Time' startCollapsed collapsible>
            <table>
                <thead>
                    <tr>
                        <th>Reason</th>
                        <th>Time</th>
                        <th>Travel</th>
                        <th>Miles</th>
                        <th>Expenses</th>
                    </tr>
                </thead>
                <tbody>
                    {props.engineer.additionalTime.map((additionalTime, index) => 
                        <tr key={index}>
                            <td>
                                <Label text={additionalTime.activity.name} color='no-color'/>
                            </td>
                            <td>{additionalTime.time} hrs</td>
                            <td>{additionalTime.travel} hrs</td>
                            <td>{additionalTime.miles} mi</td>
                            <td>£{additionalTime.expenses}</td>
                        </tr>
                    )}
                </tbody>
                <tfoot>
                    <tr>
                        <td></td>
                        <th>{props.engineer.additionalTimeTotals.time} hrs</th>
                        <th>{props.engineer.additionalTimeTotals.travel} hrs</th>
                        <th>{props.engineer.additionalTimeTotals.miles} mi</th>
                        <th>£{props.engineer.additionalTimeTotals.expenses}</th>
                    </tr>
                </tfoot>
            </table>
        </InnerContainer>
    )
}

export default AdditionalTime