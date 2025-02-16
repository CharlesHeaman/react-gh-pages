import { Dispatch, SetStateAction, useState } from "react";
import SubmitButton from "../../../../../../components/form/SubmitButton/SubmitButton";
import WindowOverlay from "../../../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import { PostCompletionChangeRequestResponseData } from "../../../../../../types/postCompletionChangeRequets.types";
import putAPI from "../../../../../../utils/putAPI";

const AcceptRequest = (props: {
    requestID: number,
    setRequestData: Dispatch<SetStateAction<PostCompletionChangeRequestResponseData | undefined>>
    show: boolean,
    hideFunc: () => void
}) => {
    const [submitting, setSubmitting] = useState(false);

    const submitAccept = () => {
        putAPI(`post_completion_change_requests/${props.requestID}/respond`, {}, {
            accepted: true
        }, (response: any) => {
            props.setRequestData(response.data);
            props.hideFunc();
        }, setSubmitting);
    }
    
    return (
        <WindowOverlay
            title='Accept Request'
            maxWidth={300} 
            show={props.show}
            hideFunc={props.hideFunc}
            footer={
                <SubmitButton 
                    text='Accept Request' 
                    iconFont="thumb_up"
                    color='light-green' 
                    clickFunc={submitAccept} 
                    submitting={submitting} 
                    submittingText='Accepting...'
                />
            }
        >
            <p>This will unlock the associated ticket allowing the engineer to make changes.</p>
        </WindowOverlay>
    )
}

export default AcceptRequest