import UserLink from "../../../../components/ui/Links/UserLink"
import { AdditionalTimeResponseData } from "../../../../types/additionalTime.types"
import { UserResponseData } from "../../../../types/user.types"
import formatDate from "../../../../utils/formatDate"
import formatHours from "../../../../utils/formatHours"
import formatMiles from "../../../../utils/formatMiles"
import formatMoney from "../../../../utils/formatMoney"

const AdditionalTimeRow = (props: {
    additionalTime: AdditionalTimeResponseData,
    user: UserResponseData | undefined,
}) => {
    return (
        <tr>
            <td className="text-left">{props.user ? <UserLink username={props.user.data.username} firstName={props.user.data.first_name} lastName={props.user.data.last_name}/> : 'Unknown'}</td>
            <td>{formatHours(props.additionalTime.data.activity_time)} hrs</td>
            <td>{formatHours(props.additionalTime.data.travel_time)} hrs</td>
            <td>{formatMiles(props.additionalTime.data.mileage)} mi</td>
            <td>{formatMoney(props.additionalTime.data.expenses)}</td>
            <td>{formatDate(props.additionalTime.data.date)}</td>
        </tr>
    )
}

export default AdditionalTimeRow