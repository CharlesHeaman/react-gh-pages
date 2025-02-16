import UserLink from "../../../../../../../../components/ui/Links/UserLink"
import { InvoiceTypeActivityResponseData } from "../../../../../../../../types/invoiceTypeActivity.types"
import { UserResponseData } from "../../../../../../../../types/user.types"
import formatDateTimestamp from "../../../../../../../../utils/formatTimestamp"
import BasicActivityLabel from "../../../../../../../CostCentres/CostCentrePage/components/CostCentreSideBar/components/CostCentreAssociatedData/components/CostCentreActivityLabel"

const InvoiceTypeActivityRow = (props: {
    invoiceTypeActivity: InvoiceTypeActivityResponseData,
    user: UserResponseData | undefined,
}) => {
    return (
        <tr>
            <td><BasicActivityLabel action={props.invoiceTypeActivity.data.type}/></td>
            <td className="text-left">{props.user ? <UserLink username={props.user.data.username} firstName={props.user.data.first_name} lastName={props.user.data.last_name}/> : 'Unknown'}</td>
            <td>{formatDateTimestamp(props.invoiceTypeActivity.data.created_at)}</td>
        </tr>
    )
}

export default InvoiceTypeActivityRow