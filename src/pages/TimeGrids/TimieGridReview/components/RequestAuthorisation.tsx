import { Dispatch, SetStateAction, useEffect, useState } from "react";
import SubmitButton from "../../../../components/form/SubmitButton/SubmitButton";
import ToggleButton from "../../../../components/ui/Buttons/ToggleButton/ToggleButton";
import GridItem from "../../../../components/ui/Containers/GridItem/GridItem";
import WindowOverlay from "../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import getAPI from "../../../../utils/getAPI";
import { UserCollectionResponse, UserResponseData } from "../../../../types/user.types";
import postAPI from "../../../../utils/postAPI";

interface UserRecipient extends UserResponseData {
    selected: boolean
}

function RequestAuthorisation(props: {
    showRequestAuth: boolean,
    setShowRequestAuth: Dispatch<SetStateAction<boolean>>
    timegridID: number,
    responseFunc: (response: any) => void
}) {
    

    const [recipients, setRecipients] = useState<Array<UserRecipient>>([])
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        getAPI(`users`, {
            permissions: {
                can_auth_time: true
            }
        }, (response: any) => {
            const userData: UserCollectionResponse = response.data;
            setRecipients(userData.data.map((user) => {
                return {
                    ...user,
                    selected: false
                }
            }));
        }, setSubmitting)
    }, [])
    
    const requestAuthorisation = () => {
        postAPI(`timegrids/${props.timegridID}/request_authorisation_review`, {}, {
            user_ids: recipients.filter((recipient) => recipient.selected).map((recipient) => recipient.id)
        }, props.responseFunc, setSubmitting)
    }

    const updateRecipientCollection = (contactID: number) => {
        setRecipients(prevState => 
            prevState.map(obj => {
                if (obj.id === contactID) {
                    let newOjb = obj;
                    newOjb.selected = !obj.selected;
                    return newOjb;
                }
                return obj
            })
        )
    }

    return (
        <WindowOverlay
            title='Request Authorisation Review'
            maxWidth={300} 
            show={props.showRequestAuth} 
            hideFunc={() => props.setShowRequestAuth(false)}
            footer={<SubmitButton 
                text='Request Authorisation Review' 
                color='light-blue' 
                iconFont="forward_to_inbox"
                disabled={recipients.filter((recipient) => recipient.selected).length === 0} 
                clickFunc={requestAuthorisation} 
                submitting={submitting} 
                submittingText='Requesting...'
            />}
        >
            <p>Request another user to review authorisation of this this timegrid?</p>
                <GridItem title='Recipients'>
                    {recipients.map((item, index) => 
                        <ToggleButton 
                            text={`${item.data.first_name} ${item.data.last_name} - ${item.data.job_title}`} 
                            selected={item.selected} 
                            clickFunc={() => updateRecipientCollection(item.id)} 
                            color='dark-blue' 
                            key={index}
                        />
                    )}
                </GridItem>
        </WindowOverlay>
    )
}

export default RequestAuthorisation