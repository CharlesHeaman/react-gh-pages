import TicketLink from "../../../../components/ui/Links/TicketLink"
import UserLink from "../../../../components/ui/Links/UserLink"
import { DepartmentResponseData } from "../../../../types/department.types"
import { RefrigerantMovementResponseData } from "../../../../types/refrigerantMovement.types"
import { TicketResponseData } from "../../../../types/tickets.types"
import { UserResponseData } from "../../../../types/user.types"
import findDepartment from "../../../../utils/findDepartment"
import formatDateTimestamp from "../../../../utils/formatTimestamp"
import formatWeight from "../../../../utils/formatWeight"
import RefrigerantMovementLabel from "../RefrigerantMovementLabel"

const RefrigerantMovementRow = (props: {
    refrigerantMovement: RefrigerantMovementResponseData,
    user: UserResponseData | undefined,
    ticket: TicketResponseData | undefined,
    departments: Array<DepartmentResponseData>
}) => {
    const department = findDepartment(props.departments, props.ticket ? props.ticket.data.department_id : 0);
    
    return (
        <tr>
            <td><RefrigerantMovementLabel isDecant={props.refrigerantMovement.data.is_decant}/></td>
            <td className="text-left">{props.ticket && department ? <TicketLink 
                ticket={props.ticket}
                departmentName={department.data.name}
            /> : null}</td>
            <td className="text-right">{formatWeight(props.refrigerantMovement.data.weight)} kg</td>
            <td className="text-left">{props.user ? <UserLink username={props.user.data.username} firstName={props.user.data.first_name} lastName={props.user.data.last_name}/> : 'Unknown'}</td>
            <td>{formatDateTimestamp(props.refrigerantMovement.data.movement_date)}</td>
        </tr>
    )
}

export default RefrigerantMovementRow