import { useState } from "react";
import TextareaAutosize from 'react-textarea-autosize';
import SubmitButton from "../../../../components/form/SubmitButton/SubmitButton";
import GridItem from "../../../../components/ui/Containers/GridItem/GridItem";
import InfoGrid from "../../../../components/ui/Containers/InfoGrid/InfoGrid";
import WindowOverlay from "../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import postAPI from "../../../../utils/postAPI";

const AddTimegridNote = (props: {
    show: boolean,
    hideFunc: () => void,
    date: Date,
    userID: number,
    resFunc: () => void
}) => {
    const [submitting, setSubmitting] = useState(false);
    const [comment, setComment] = useState('');

    const addNote = () => {
        postAPI(`timegrid_notes/create`, {}, {
            text: comment,
            user_id: props.userID,
            date: props.date
        }, () => {
            props.resFunc();
            props.hideFunc();
        }, setSubmitting)
    }

    return (
        <WindowOverlay
            maxWidth={300} 
            title="Add Timegrid Note"
            show={props.show}
            hideFunc={props.hideFunc}
            footer={<SubmitButton 
                text='Add Timegrid Note' 
                color='light-green' 
                iconFont="comment"
                clickFunc={addNote} 
                disabled={comment.length === 0} 
                submitting={submitting}
                submittingText='Adding...'
            />}
        >
            <p>Write a note for this timegrid. This note will be displayed on timegrid reports.</p>
            <InfoGrid>
                <GridItem title='Note'>
                    <TextareaAutosize 
                        minRows={3}
                        placeholder="Write a note here..." 
                        onChange={(e) => { setComment(e.target.value) }}
                        autoFocus
                    />
                </GridItem>
            </InfoGrid>
        </WindowOverlay>
    )
}

export default AddTimegridNote