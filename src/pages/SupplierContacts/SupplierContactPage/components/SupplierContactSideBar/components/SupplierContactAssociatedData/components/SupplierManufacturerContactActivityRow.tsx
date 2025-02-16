import UserLink from "../../../../../../../../components/ui/Links/UserLink"
import { SupplierManufacturerContactActivityResponseData } from "../../../../../../../../types/supplierManufacturerContactActivity.types"
import { UserResponseData } from "../../../../../../../../types/user.types"
import formatDateTimestamp from "../../../../../../../../utils/formatTimestamp"
import SupplierManufacturerContactActivityLabel from "./SupplierManufacturerContactActivityLabel"

const SupplierManufacturerContactActivityRow = (props: {
    supplierManufacturerContactActivity: SupplierManufacturerContactActivityResponseData,
    user: UserResponseData | undefined,
}) => {
    return (
        <tr>
            <td><SupplierManufacturerContactActivityLabel action={props.supplierManufacturerContactActivity.data.type}/></td>
            <td className="text-left">{props.user ? <UserLink username={props.user.data.username} firstName={props.user.data.first_name} lastName={props.user.data.last_name}/> : 'Unknown'}</td>
            <td>{formatDateTimestamp(props.supplierManufacturerContactActivity.data.created_at)}</td>
        </tr>
    )
}

export default SupplierManufacturerContactActivityRow