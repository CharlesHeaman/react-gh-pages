import Comment from "../../../../../../components/ui/Comment/Comment"
import { TicketNoteResponseData } from "../../../../../../types/ticketNotes.types"
import { UserResponseData } from "../../../../../../types/user.types"
import getUserFullName from "../../../../../../utils/getUserFullName"

const TimegridTicketComment = (props: {
    note: TicketNoteResponseData,
    user: UserResponseData | undefined,
    engineerIndex: number
}) => {
    const commentColours = ['dark-blue', 'orange', 'purple', 'red'];
    
    return (
        <Comment
            user={props.user}
            date={props.note.data.created_at}
            text={props.note.data.text} 
            color={commentColours[props.engineerIndex]}
        />
    )

}

export default TimegridTicketComment