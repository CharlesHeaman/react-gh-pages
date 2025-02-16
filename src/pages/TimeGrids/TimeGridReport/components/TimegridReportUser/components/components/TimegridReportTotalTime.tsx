import { ReducedTimegridTicketTime } from "../../../../../../../utils/reduceTimegridTicketTime"
import { ReducedAdditionalTime } from "../../../../../TimieGridReview/components/utils/reducedAdditionalTime"

const TimegridReportDayTotal = (props: {
    reducedTimegridTicketTime: ReducedTimegridTicketTime,
    reducedAdditionalTime: ReducedAdditionalTime,
    isAccounts: boolean
}) => {
    return (
        <tr>
            <td></td>
            {!props.isAccounts ?
                <>
                    <td></td>
                    <td colSpan={2} className="no-wrap"><b style={{ fontSize: '0.85em'}}>{
                        props.reducedTimegridTicketTime.on_site_time + 
                        props.reducedAdditionalTime.activity_time +
                        props.reducedTimegridTicketTime.travel_time + 
                        props.reducedAdditionalTime.travel_time
                    } hrs</b></td>
                    <td className="no-wrap"><b style={{ fontSize: '0.85em'}}>{props.reducedTimegridTicketTime.mileage + props.reducedAdditionalTime.mileage} mi</b></td>
                    <td className="no-wrap"><b style={{ fontSize: '0.85em'}}>£{props.reducedTimegridTicketTime.expenses + props.reducedAdditionalTime.expenses}</b></td>
                </> :
                <>
                    <td className="no-wrap"><b style={{ fontSize: '0.85em'}}>{(
                        props.reducedTimegridTicketTime.on_site_time + 
                        props.reducedAdditionalTime.activity_time +
                        props.reducedTimegridTicketTime.travel_time + 
                        props.reducedAdditionalTime.travel_time
                    )} hrs</b></td>
                    <td className="no-wrap"><b style={{ fontSize: '0.85em'}}>{props.reducedTimegridTicketTime.own_mileage} mi</b></td>
                </>
            }
        </tr>
    )
}

export default TimegridReportDayTotal