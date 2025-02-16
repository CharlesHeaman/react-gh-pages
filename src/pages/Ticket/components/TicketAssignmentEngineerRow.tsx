import Label from "../../../components/ui/General/Label/Label"
import { UserResponseData } from "../../../types/user.types"
import getUserFullName from "../../../utils/getUserFullName"

const TicketAssignmentEngineerRow = (props: {
    isLead: boolean,
    user: UserResponseData | undefined
}) => {
    return (
        <tr>
            <td style={{width: '50px'}}>
                {props.isLead ?
                    <Label text="Lead" iconFont="person" color="light-green"/> :
                    <Label text="Mate" iconFont="person_add" color="purple"/>
                }
            </td>
            <td className="text-left">
                {props.user ? getUserFullName(props.user) : 'Unknown'}
            </td>
        </tr>
    )
}

export default TicketAssignmentEngineerRow