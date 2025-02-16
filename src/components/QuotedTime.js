import formatHours from "../utils/formatHours"
import formatMiles from "../utils/formatMiles"
import QuoteLink from "./ui/Links/QuoteLink"

function QuotedTime(props) {
    return (
        <table>
            <thead>
                <tr>
                    <th>Quote</th>
                    <th>Labour</th>
                    <th>Travel</th>
                    <th>Mileage</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <QuoteLink 
                            number={props.quoteData.number} 
                            suffix={props.quoteData.suffix} 
                            id={props.quoteData.id}
                        />
                    </td>
                    <td>
                        {props.quotedTime && props.quotedTime.labour ?     
                            formatHours(Object.values(props.quotedTime.labour.engineers[0]).reduce((a, b) => a + b, 0)) : '?'
                        } hrs
                    </td>
                    <td>
                        {props.quotedTime ?
                            formatHours(props.quotedTime.travelTime) : '?'
                        } hrs
                    </td>
                    <td>
                        {props.quotedTime ?
                            formatMiles(props.quotedTime.mileage) :'?'
                        } mi
                    </td>
                </tr>
            </tbody>
        </table>
    )
}

export default QuotedTime