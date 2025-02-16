
import UserLink from "../../../../../../../../components/ui/Links/UserLink"
import { StockMovementsResponseData } from "../../../../../../../../types/stockMovements.types"
import { UserResponseData } from "../../../../../../../../types/user.types"
import formatDateTimestamp from "../../../../../../../../utils/formatTimestamp"
import StockMovementLabel from "./StockMovementLabel"

const StockMovementRow = (props: {
    stockMovement: StockMovementsResponseData,
    user: UserResponseData | undefined,
}) => {
    return (
        <tr>
            <td><StockMovementLabel type={props.stockMovement.data.type}/></td>
            <td className="text-left">{props.user ? <UserLink username={props.user.data.username} firstName={props.user.data.first_name} lastName={props.user.data.last_name}/> : 'Unknown'}</td>
            <td className="text-left">{props.stockMovement.data.description}</td>
            <td>{formatDateTimestamp(props.stockMovement.data.created_at)}</td>
        </tr>
    )
}

export default StockMovementRow