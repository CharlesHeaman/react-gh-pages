import UserLink from "../../../../../../../../components/ui/Links/UserLink"
import { ContactActivityResponseData } from "../../../../../../../../types/contactActivity.types"
import { UserResponseData } from "../../../../../../../../types/user.types"
import formatDateTimestamp from "../../../../../../../../utils/formatTimestamp"
import ContactActivityLabel from "./ContactActivityLabel"

const ContactActivityRow = (props: {
    contactActivity: ContactActivityResponseData,
    user: UserResponseData | undefined,
}) => {
    return (
        <tr>
            <td><ContactActivityLabel action={props.contactActivity.data.type}/></td>
            <td className="text-left">{props.user ? <UserLink username={props.user.data.username} firstName={props.user.data.first_name} lastName={props.user.data.last_name}/> : 'Unknown'}</td>
            <td>{formatDateTimestamp(props.contactActivity.data.created_at)}</td>
        </tr>
    )
}

export default ContactActivityRow