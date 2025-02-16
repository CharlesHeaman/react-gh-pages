import Label from "../../../../../../../components/ui/General/Label/Label"
import { TimegridNoteResponseData } from "../../../../../../../types/timegridNote.types"
import { UserResponseData } from "../../../../../../../types/user.types"
import getUserFullName from "../../../../../../../utils/getUserFullName"

const TimegridNoteRow = (props: {
    user: UserResponseData | undefined,
    note: TimegridNoteResponseData,
    userID: number
}) => {
    return (
        <tr>
            <td colSpan={99}>
                <div className="flex" style={{
                    paddingLeft: 'var(--small-gap)'
                }}>
                    {props.user && <Label
                        text={getUserFullName(props.user)}
                        color={'no-color'}
                    />}
                    <span>{props.note.data.text}</span>
                </div>
            </td>
        </tr>
    )
}

export default TimegridNoteRow