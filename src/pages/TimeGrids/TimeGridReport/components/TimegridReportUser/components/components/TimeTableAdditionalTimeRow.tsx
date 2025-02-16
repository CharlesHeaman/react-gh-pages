import Label from "../../../../../../../components/ui/General/Label/Label"
import { AdditionalTimeActivityResponseData } from "../../../../../../../types/additionalTimeActivity.types"
import { AdditionalTimeResponseData } from "../../../../../../../types/additionalTime.types"

const TimeTableAdditionalTimeRow = (props: {
    additionalTime: AdditionalTimeResponseData
    activity: AdditionalTimeActivityResponseData | undefined,
    isAccounts: boolean
}) => {
    return (
        <tr>
            <td>
                {props.activity && <Label
                    text={props.activity.data.name} 
                    title={props.activity.data.description} 
                    color='no-color'
                />}
            </td>
            {!props.isAccounts ?
                <>
                    <td></td>
                    <td>
                        <p className="no-wrap">{props.additionalTime.data.activity_time} hrs</p>
                    </td>
                    <td>
                        <p className="no-wrap">{props.additionalTime.data.travel_time} hrs</p>
                    </td>
                    <td>
                        <p className="no-wrap">{props.additionalTime.data.mileage} mi</p>
                    </td>
                    <td>
                        <p className="no-wrap">£{props.additionalTime.data.expenses}</p>
                    </td>
                </> : 
                <>
                    <td>
                        <p className="no-wrap">{props.additionalTime.data.activity_time + props.additionalTime.data.travel_time} hrs</p>
                    </td>
                    <td>
                        <p className="no-wrap">0 mi</p>
                    </td>
                </>
            }
        </tr>
    )
}

export default TimeTableAdditionalTimeRow