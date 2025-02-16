import UserLink from "../../../../../components/ui/Links/UserLink"
import { PurchaseOrderActivityResponseData } from "../../../../../types/purchaseOrderActivity.types"
import { UserResponseData } from "../../../../../types/user.types"
import formatDateTimestamp from "../../../../../utils/formatTimestamp"
import PurchaseOrderActivityLabel from "./PuchaseOrderActivityLabel"

const PurchaseOrderActivityRow = (props: {
    purchaseOrderActivity: PurchaseOrderActivityResponseData,
    user: UserResponseData | undefined,
}) => {
    return (
        <tr>
            <td><PurchaseOrderActivityLabel action={props.purchaseOrderActivity.data.type}/></td>
            <td className="text-left">{props.user ? <UserLink username={props.user.data.username} firstName={props.user.data.first_name} lastName={props.user.data.last_name}/> : 'Unknown'}</td>
            <td>{formatDateTimestamp(props.purchaseOrderActivity.data.created_at)}</td>
        </tr>
    )
}

export default PurchaseOrderActivityRow