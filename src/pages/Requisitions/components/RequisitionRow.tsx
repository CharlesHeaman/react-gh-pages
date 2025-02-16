import Label from "../../../components/ui/General/Label/Label"
import UserLink from "../../../components/ui/Links/UserLink"
import { CostCentreResponseData } from "../../../types/costCentres.types"
import { RequisitionResponseData } from "../../../types/requisition.types"
import { UserResponseData } from "../../../types/user.types"
import formatDate from "../../../utils/formatDate"
import AssociatedResourceTypeLabel from "../../CostCentres/utils/AssociatedResourceTypeLabel"
import RequisitionLink from "./RequisitionLink"

const RequisitionRow = (props: {
    requisition: RequisitionResponseData,
    originator: UserResponseData | undefined,
    recipient: UserResponseData | undefined,
    costCentre: CostCentreResponseData | undefined,
    hideType?: boolean
}) => {
    return (
        <tr>
            <td><RequisitionLink requisitionNumber={props.requisition.data.number}/></td>
            {!props.hideType ?
                <td><AssociatedResourceTypeLabel resourceType={props.costCentre ? props.costCentre.data.associated_resource_type : null}/></td>
                : null
            }
            <td className="text-left">{props.originator ? <UserLink username={props.originator.data.username} firstName={props.originator.data.first_name} lastName={props.originator.data.last_name}/> : null}</td>
            <td className="text-left">{props.recipient ? <UserLink username={props.recipient.data.username} firstName={props.recipient.data.first_name} lastName={props.recipient.data.last_name}/> : 'Not Assigned'}</td>
            <td>{formatDate(props.requisition.data.created_at)}</td>
            <td>{props.requisition.data.is_complete ?
                <Label text="Complete" iconFont="assignment_turned_in" color="dark-blue"/> :
                <Label text="Pending" iconFont="pending" color="light-blue"/> 
            }</td>
        </tr>
    )
}

export default RequisitionRow