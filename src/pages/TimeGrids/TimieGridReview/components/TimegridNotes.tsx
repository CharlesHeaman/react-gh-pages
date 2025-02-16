import { useState } from "react"
import Comment from "../../../../components/ui/Comment/Comment"
import { TimegridNoteResponseData } from "../../../../types/timegridNote.types"
import { UserResponseData } from "../../../../types/user.types"
import findUser from "../../../../utils/findUser"
import DeleteTimegridNote from "./DeleteTimegridNotes"

const TimegridNotes = (props: {
    notesData: Array<TimegridNoteResponseData>,
    users: Array<UserResponseData>,
    userID: number,
    // currentUserID: number,
    getTimegridNotes: () => void
}) => {
    const [showDelete, setShowDelete] = useState<boolean>(false);
    const [selectedTimegridNoteID, setSelectedTimegridNoteID] = useState<number>(0);
    return (
        <>
            <section>
                <h2>Notes</h2>
                {props.notesData.map((note, index) =>
                    <Comment
                        user={findUser(props.users, note.data.created_by_id)}
                        date={note.data.created_at}
                        text={note.data.text} 
                        color={note.data.created_by_id === props.userID ? 'dark-blue' : 'light-green'}
                        showRemove={note.data.created_by_id === props.currentUserID}
                        showDelete={() => {
                            setShowDelete(true);
                            setSelectedTimegridNoteID(note.id);
                        }}
                        key={index}
                    />
                )}
                <hr/>
            </section>

            {/* <DeleteTimegridNote 
                show={showDelete} 
                hideFunc={() => setShowDelete(false)} 
                noteID={selectedTimegridNoteID} 
                resFunc={props.getTimegridNotes}
            /> */}
        </>
    )
}

export default TimegridNotes