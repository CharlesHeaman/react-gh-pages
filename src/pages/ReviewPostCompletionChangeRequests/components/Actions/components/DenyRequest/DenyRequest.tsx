import { Dispatch, SetStateAction, useState } from "react";
import SubmitButton from "../../../../../../components/form/SubmitButton/SubmitButton";
import WindowOverlay from "../../../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import { PostCompletionChangeRequestResponseData } from "../../../../../../types/postCompletionChangeRequets.types";
import putAPI from "../../../../../../utils/putAPI";

function DenyRequest(props: {
    requestID: number,
    show: boolean,
    setRequestData: Dispatch<SetStateAction<PostCompletionChangeRequestResponseData | undefined>>
    hideFunc: () => void
}) {
    const [submitting, setSubmitting] = useState(false);

    const submitDeny = () => {
        putAPI(`post_completion_change_requests/${props.requestID}/respond`, {}, {
            accepted: false
        }, (response: any) => {
            props.setRequestData(response.data);
            props.hideFunc();
        }, setSubmitting);
    }

    return (
        <WindowOverlay
            title='Deny Request'
            maxWidth={300} 
            show={props.show}
            hideFunc={props.hideFunc}
            footer={<SubmitButton 
                text='Deny Request' 
                iconFont="thumb_down"
                color='red' 
                clickFunc={submitDeny} 
                submitting={submitting} 
                submittingText='Denying...'
            />}
        >
            <p>Deny this post-completion change request?</p>
        </WindowOverlay>
    )
}

export default DenyRequest