import { useState } from "react";
import SubmitButton from "../../../../components/form/SubmitButton/SubmitButton";
import WindowOverlay from "../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import deleteAPI from "../../../../utils/deleteAPI";

const DeleteTimegridNote = (props: {
    show: boolean,
    hideFunc: () => void,
    noteID: number,
    resFunc: () => void
}) => {
    const [submitting, setSubmitting] = useState(false);

    const removeNote = () => {
        deleteAPI(`timegrid_notes/${props.noteID}/delete`, {}, () => {
            props.resFunc();
            props.hideFunc();
        }, setSubmitting)
    }

    return (
        <WindowOverlay
            maxWidth={350} 
            title="Remove Timegrid Note?"
            show={props.show}
            hideFunc={props.hideFunc}
        >
            <p>This cannot be undone.</p>
            <SubmitButton text='Remove Timegrid Note' color='red' clickFunc={removeNote} submitting={submitting} submittingText='Removing...'/>
        </WindowOverlay>
    )
}

export default DeleteTimegridNote