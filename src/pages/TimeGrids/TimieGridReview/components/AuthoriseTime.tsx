import { Dispatch, SetStateAction, useState } from "react";
import SubmitButton from "../../../../components/form/SubmitButton/SubmitButton";
import ContainerFooter from "../../../../components/ui/Containers/ContainerFooter/ContainerFooter";
import InnerContainer from "../../../../components/ui/Containers/InnerContainer/InnerContainer";
import handleError from "../../../../utils/handleError";
import { post } from "../../../../utils/Requests";
import WindowOverlay from "../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import postAPI from "../../../../utils/postAPI";

function AuthoriseTime(props: {
    showAuth: boolean,
    setShowAuth: Dispatch<SetStateAction<boolean>>
    timegridID: number,
    responseFunc: (response: any) => void
}) {
    const [submitting, setSubmitting] = useState(false);

    const authoriseTime = () => {
        postAPI('timegrid_authorisation_signatures/create', {}, {
            timegrid_id: props.timegridID
        }, props.responseFunc, setSubmitting);
    }

    return (
        <WindowOverlay 
            title={"Authorise Time"} 
            maxWidth={300} 
            show={props.showAuth} 
            hideFunc={() => props.setShowAuth(false)}
            footer={<SubmitButton 
                text='Authorise Time' 
                iconFont="badge"
                color='dark-purple' 
                clickFunc={authoriseTime} 
                submitting={submitting} 
                submittingText='Authorizing...'
            />}
        >
            <p>This will add your authorisation signature to the timegrid.</p>
        </WindowOverlay>
    )
}

export default AuthoriseTime