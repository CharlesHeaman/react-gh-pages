import UserLink from "../../../../../../../components/ui/Links/UserLink"
import { CustomerActivityResponseData } from "../../../../../../../types/customerActivity.types"
import { UserResponseData } from "../../../../../../../types/user.types"
import formatDateTimestamp from "../../../../../../../utils/formatTimestamp"
import CustomerActivityLabel from "./CustomerActivityLabel"


const CustomerActivityRow = (props: {
    customerActivity: CustomerActivityResponseData,
    user: UserResponseData | undefined,
}) => {
    return (
        <tr>
            <td><CustomerActivityLabel action={props.customerActivity.data.type}/></td>
            <td className="text-left">{props.user ? <UserLink username={props.user.data.username} firstName={props.user.data.first_name} lastName={props.user.data.last_name}/> : 'Unknown'}</td>
            <td>{formatDateTimestamp(props.customerActivity.data.created_at)}</td>
        </tr>
    )
}

export default CustomerActivityRow