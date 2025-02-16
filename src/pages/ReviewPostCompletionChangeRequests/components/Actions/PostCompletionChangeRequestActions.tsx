import { Dispatch, SetStateAction, useState } from "react";
import SideBarButton from "../../../../components/ui/Buttons/SideBarButton/SideBarButton";
import SideBarModule from "../../../../components/ui/Containers/SideBarModule/SideBarModule";
import DenyRequest from "./components/DenyRequest/DenyRequest";
import AcceptRequest from "./components/AcceptRequest/AcceptRequest";
import { PostCompletionChangeRequestResponseData } from "../../../../types/postCompletionChangeRequets.types";

const PostCompletionChangeRequestActions = (props: { 
    requestID: number, 
    canAccept: boolean, 
    setRequestData: Dispatch<SetStateAction<PostCompletionChangeRequestResponseData | undefined>>
} ) => {
    const [showAccept, setShowAccept] = useState(false);
    const [showDeny, setShowDeny] = useState(false);

    return (
        <>
            <SideBarModule title='Actions'>
                {/* Accept Request*/}
                {props.canAccept && <SideBarButton 
                    text='Accept Request' 
                    color='light-green' 
                    iconFont='thumb_up' 
                    clickEvent={() => { setShowAccept(true) }}
                />}
                {/* Deny Request*/}
                <SideBarButton 
                    text='Deny Request' 
                    color='red' 
                    iconFont='thumb_down' 
                    clickEvent={() => { setShowDeny(true) }}
                />
            </SideBarModule>

            {/* Accept Request */}
            <AcceptRequest 
                requestID={props.requestID}
                show={showAccept} 
                setRequestData={props.setRequestData}
                hideFunc={() => setShowAccept(false)}            
            />

            {/* Deny Request */}
            <DenyRequest 
                requestID={props.requestID} 
                show={showDeny} 
                setRequestData={props.setRequestData}
                hideFunc={() => setShowDeny(false)}     
            />
        </>
    )
}

export default PostCompletionChangeRequestActions

