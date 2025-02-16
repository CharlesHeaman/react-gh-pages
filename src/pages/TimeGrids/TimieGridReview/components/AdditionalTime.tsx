import Label from "../../../../components/ui/General/Label/Label"
import { AdditionalTimeActivityResponseData } from "../../../../types/additionalTimeActivity.types"
import { AdditionalTimeResponseData } from "../../../../types/additionalTime.types"
import getReducedAdditionalTime from "./utils/reducedAdditionalTime"
import formatMoney from "../../../../utils/formatMoney"
import formatMiles from "../../../../utils/formatMiles"
import formatHours from "../../../../utils/formatHours"

function AdditionalTime(props: {
    additionalTimeData: Array<AdditionalTimeResponseData>,
    activityData: Array<AdditionalTimeActivityResponseData>
}) {
    const getActivity = (activityID: number) => {
        return props.activityData.find((activity) => activity.id === Number(activityID));
    }
      
    return (
        <>
            <section>
                <h2>Non-ticket Time</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Type</th>
                            <th>Time</th>
                            <th>Travel</th>
                            <th>Miles</th>
                            <th>Expenses</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.additionalTimeData.map((additionalTime, index) => 
                            <tr key={index}>
                                <td><Label 
                                    text={getActivity(additionalTime.data.activity_id)?.data.name} 
                                    title={getActivity(additionalTime.data.activity_id)?.data.description} 
                                    color='no-color'
                                    iconFont="more_time"
                                /></td>
                                <td>{formatHours(additionalTime.data.activity_time)} hrs</td>
                                <td>{formatHours(additionalTime.data.travel_time)} hrs</td>
                                <td>{formatMiles(additionalTime.data.mileage)} mi</td>
                                <td>{formatMoney(additionalTime.data.expenses)}</td>
                            </tr>
                        )}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td></td>
                            <th>{formatHours(getReducedAdditionalTime(props.additionalTimeData).activity_time)} hrs</th>
                            <th>{formatHours(getReducedAdditionalTime(props.additionalTimeData).travel_time)} hrs</th>
                            <th>{formatMiles(getReducedAdditionalTime(props.additionalTimeData).mileage)} mi</th>
                            <th>{formatMoney(getReducedAdditionalTime(props.additionalTimeData).expenses)}</th>
                        </tr>
                    </tfoot>
                </table>
            </section>
            <hr/>
        </>
    )
}

export default AdditionalTime