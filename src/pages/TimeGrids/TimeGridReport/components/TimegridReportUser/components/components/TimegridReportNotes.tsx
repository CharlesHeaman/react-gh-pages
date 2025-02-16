import { TimegridNoteResponseData } from "../../../../../../../types/timegridNote.types"
import { UserResponseData } from "../../../../../../../types/user.types"
import Comment from "../../../../../../../components/ui/Comment/Comment"
import findUser from "../../../../../../../utils/findUser"

const TimegridReportNotes = (props: {
    userID: number,
    timegridNotes: Array<TimegridNoteResponseData>,
    users: Array<UserResponseData>
}) => {
    return (
        props.timegridNotes.length > 0 ? 
            <tr>
                <td colSpan={99}>
                    {props.timegridNotes.map((note, index) =>
                        <Comment
                            user={findUser(props.users, note.data.created_by_id)}                        
                            color={note.data.created_by_id === props.userID ? 'dark-blue' : 'light-green'} 
                            date={note.data.date} 
                            text={note.data.text} 
                            key={index} 
                        />
                    )}    
                </td>
            </tr> : 
            null
    )
}

export default TimegridReportNotes