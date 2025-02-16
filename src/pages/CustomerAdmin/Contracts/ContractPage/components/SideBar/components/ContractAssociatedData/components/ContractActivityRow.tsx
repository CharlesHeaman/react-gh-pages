import UserLink from "../../../../../../../../../components/ui/Links/UserLink"
import { ContractActivityResponseData } from "../../../../../../../../../types/contractActivity.types"
import { UserResponseData } from "../../../../../../../../../types/user.types"
import formatDateTimestamp from "../../../../../../../../../utils/formatTimestamp"
import ContractActivityLabel from "./ContractActivityLabel"

const ContractActivityRow = (props: {
    contractActivity: ContractActivityResponseData,
    user: UserResponseData | undefined,
}) => {
    return (
        <tr>
            <td><ContractActivityLabel action={props.contractActivity.data.type}/></td>
            <td className="text-left">{props.user ? <UserLink username={props.user.data.username} firstName={props.user.data.first_name} lastName={props.user.data.last_name}/> : 'Unknown'}</td>
            <td>{formatDateTimestamp(props.contractActivity.data.created_at)}</td>
        </tr>
    )
}

export default ContractActivityRow