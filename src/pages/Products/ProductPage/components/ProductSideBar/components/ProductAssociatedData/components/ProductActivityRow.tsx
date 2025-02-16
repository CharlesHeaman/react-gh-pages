
import UserLink from "../../../../../../../../components/ui/Links/UserLink"
import { ProductActivityResponseData } from "../../../../../../../../types/productActivity.types"
import { UserResponseData } from "../../../../../../../../types/user.types"
import formatDateTimestamp from "../../../../../../../../utils/formatTimestamp"
import ProductActivityLabel from "./ProductActivityLabel"

const ProductActivityRow = (props: {
    productActivity: ProductActivityResponseData,
    user: UserResponseData | undefined,
}) => {
    return (
        <tr>
            <td><ProductActivityLabel action={props.productActivity.data.type}/></td>
            <td className="text-left">{props.user ? <UserLink username={props.user.data.username} firstName={props.user.data.first_name} lastName={props.user.data.last_name}/> : 'Unknown'}</td>
            <td>{formatDateTimestamp(props.productActivity.data.created_at)}</td>
        </tr>
    )
}

export default ProductActivityRow