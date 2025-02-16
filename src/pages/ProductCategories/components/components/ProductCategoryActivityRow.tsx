import UserLink from "../../../../components/ui/Links/UserLink"
import { ProductCategoryActivityResponseData } from "../../../../types/productCategoryActivity.types"
import { UserResponseData } from "../../../../types/user.types"
import formatDateTimestamp from "../../../../utils/formatTimestamp"
import BasicActivityLabel from "../../../CostCentres/CostCentrePage/components/CostCentreSideBar/components/CostCentreAssociatedData/components/CostCentreActivityLabel"

const ProductCategoryActivityRow = (props: {
    productCategoryActivity: ProductCategoryActivityResponseData,
    user: UserResponseData | undefined,
}) => {
    return (
        <tr>
            <td><BasicActivityLabel action={props.productCategoryActivity.data.type}/></td>
            <td className="text-left">{props.user ? <UserLink username={props.user.data.username} firstName={props.user.data.first_name} lastName={props.user.data.last_name}/> : 'Unknown'}</td>
            <td>{formatDateTimestamp(props.productCategoryActivity.data.created_at)}</td>
        </tr>
    )
}

export default ProductCategoryActivityRow