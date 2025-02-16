import UserLink from "../../../components/ui/Links/UserLink"
import { GasBottleActivityResponseData } from "../../../types/gasBottleActivity"
import { UserResponseData } from "../../../types/user.types"
import formatDateTimestamp from "../../../utils/formatTimestamp"
import GasBottleActivityLabel from "./GasBottleActivityLabel"

const GasBottleActivityRow = (props: {
    gasBottleActivity: GasBottleActivityResponseData,
    user: UserResponseData | undefined,
    engineer: UserResponseData | undefined,
    isConsumable?: boolean,
}) => {
    return (
        <tr>
            <td>{<GasBottleActivityLabel action={props.gasBottleActivity.data.type}/>}</td>
            <td className="text-left">{props.user ? <UserLink username={props.user.data.username} firstName={props.user.data.first_name} lastName={props.user.data.last_name}/> : 'Unknown'}</td>
            {!props.isConsumable ? <td className="text-right">{props.gasBottleActivity.data.current_gas_weight}kg</td> : null}
            <td className="text-left">{props.engineer ? <UserLink username={props.engineer.data.username} firstName={props.engineer.data.first_name} lastName={props.engineer.data.last_name}/> : 'Unassigned'}</td>
            <td>{formatDateTimestamp(props.gasBottleActivity.data.date)}</td>
        </tr>
    )
}

export default GasBottleActivityRow