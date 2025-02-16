import { Dispatch, SetStateAction, useState } from "react";
import TextareaAutosize from 'react-textarea-autosize';
import SubmitButton from "../../../../components/form/SubmitButton/SubmitButton";
import GridItem from "../../../../components/ui/Containers/GridItem/GridItem";
import InfoGrid from "../../../../components/ui/Containers/InfoGrid/InfoGrid";
import WindowOverlay from "../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import putAPI from "../../../../utils/putAPI";

function ReturnToEngineer(props: {
    showReturn: boolean,
    setShowReturn: Dispatch<SetStateAction<boolean>>
    timegridID: number,
    responseFunc: (response: any) => void
}) {
    const [submitting, setSubmitting] = useState(false);
    const [comment, setComment] = useState('');

    const submitReturn = () => {
        putAPI(`timegrids/${props.timegridID}/return`, {}, {
            comment: comment
        }, props.responseFunc, setSubmitting)
    }

    return (
        <WindowOverlay
            maxWidth={300} 
            title="Return to Engineer"
            show={props.showReturn}
            hideFunc={() => props.setShowReturn(false)}
            footer={<SubmitButton 
                text='Return to Engineer' 
                color='orange' 
                clickFunc={submitReturn} 
                disabled={comment.length === 0} 
                submitting={submitting} 
                submittingText='Returning...'
                iconFont="assignment_return"
            />}
        >
            <p>Write a comment to explain to the engineer why their timegrid was returned.</p>
            <InfoGrid>
                <GridItem title='Comment'>
                    <TextareaAutosize 
                        minRows={3}
                        placeholder="Write comment for engineer here..." 
                        onChange={(e) => { setComment(e.target.value) }}
                        autoFocus
                    />
                </GridItem>
            </InfoGrid>
        </WindowOverlay>
    )
}

export default ReturnToEngineer