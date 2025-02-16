import UserLink from "../../../../../../../../components/ui/Links/UserLink"
import { SupplierManufacturerActivityResponseData } from "../../../../../../../../types/supplierManufacturerActivity.types"
import { UserResponseData } from "../../../../../../../../types/user.types"
import formatDateTimestamp from "../../../../../../../../utils/formatTimestamp"
import SupplierManufacturerActivityLabel from "./SupplierManufacturerActivityLabel"

const SupplierManufacturerActivityRow = (props: {
    supplierManufacturerActivity: SupplierManufacturerActivityResponseData,
    user: UserResponseData | undefined,
}) => {
    return (
        <tr>
            <td><SupplierManufacturerActivityLabel action={props.supplierManufacturerActivity.data.type}/></td>
            <td className="text-left">{props.user ? <UserLink username={props.user.data.username} firstName={props.user.data.first_name} lastName={props.user.data.last_name}/> : 'Unknown'}</td>
            <td>{formatDateTimestamp(props.supplierManufacturerActivity.data.created_at)}</td>
        </tr>
    )
}

export default SupplierManufacturerActivityRow