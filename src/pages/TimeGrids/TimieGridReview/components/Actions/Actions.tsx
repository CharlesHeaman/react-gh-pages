import { Dispatch, SetStateAction, useState } from "react";
import { useNavigate } from "react-router-dom";
import SideBarButton from "../../../../../components/ui/Buttons/SideBarButton/SideBarButton";
import SideBarModule from "../../../../../components/ui/Containers/SideBarModule/SideBarModule";
import AddTimegridNote from "../AddTimegridNote";
import { TimegridResponseData } from "../../../../../types/timegrid.types";
import ValidateTimegrid from "../ValidateTimegrid";
import AuthoriseTime from "../AuthoriseTime";
import { TimegridAuthorisationSignatureResponseData } from "../../../../../types/timegridAuthorisationSignatures.types";
import RequestAuthorisation from "../RequestAuthorisation";
import ReturnToEngineer from "../ReturnToEngineer";

const TimegridActions = (props: {
    timegrid: TimegridResponseData,
    setTimegridData: Dispatch<SetStateAction<TimegridResponseData | undefined>>
    isAuthorised: boolean,
    setTimegridAuthorisationData: Dispatch<SetStateAction<Array<TimegridAuthorisationSignatureResponseData>>>,
    noOfTickets: number,
    getTimegridNotes: (userID: number, date: Date) => void,
    currentUserCanAuth: boolean
})  => {
    const navigate = useNavigate();

    const [showValidate, setShowValidate] = useState(false);
    const [showReturn, setShowReturn] = useState(false);
    const [showRequestAuth, setShowRequestAuth] = useState(false);
    const [showAuth, setShowAuth] = useState(false);
    const [showAddNote, setShowAddNote] = useState(false);

    const isSubmitted = props.timegrid.data.status === 0;
    const isValidated = props.timegrid.data.status === 2;
    const isProcessed = props.timegrid.data.status === 3;

    const canValidate = isSubmitted && !isValidated && (!props.timegrid.data.is_authorisation_required || props.isAuthorised);
    const canReturn = (isSubmitted && !isValidated);
    const canSubmit = (isValidated && !isProcessed);
    const canAuthTime = (props.timegrid.data.is_authorisation_required && props.currentUserCanAuth && !props.isAuthorised);
    const canRequestAuth = (props.timegrid.data.is_authorisation_required && !props.isAuthorised);

    return (
        <>
            <SideBarModule title='Actions'>
                {canValidate &&
                    <SideBarButton 
                        text='Validate Timegrid' 
                        color='purple' 
                        iconFont='verified'
                        clickEvent={() => { setShowValidate(true) }}
                    />
                }
                {canAuthTime && <SideBarButton 
                    text='Authorise Time' 
                    color='dark-purple' 
                    iconFont='badge' 
                    clickEvent={() => { setShowAuth(true) }}
                />} 
                {canRequestAuth && <SideBarButton 
                    text='Request Authorisation Review' 
                    color='light-blue' 
                    iconFont="forward_to_inbox"
                    clickEvent={() => { setShowRequestAuth(true) }}
                />}
                {canReturn && 
                    <SideBarButton 
                        text='Return to Engineer' 
                        color='orange' 
                        iconFont='assignment_return' 
                        clickEvent={() => { setShowReturn(true) }}
                    />
                }
                {canSubmit && 
                    <SideBarButton 
                        text='Process Timegrid' 
                        color='dark-blue' 
                        iconFont="verified"
                        clickEvent={ () => navigate('process') }
                    />
                }
                <SideBarButton
                    text='Add Timegrid Note'
                    color="light-green"
                    iconFont="comment"
                    clickEvent={() => setShowAddNote(true)}
                />
            </SideBarModule>

            <RequestAuthorisation  
                timegridID={props.timegrid.id} 
                showRequestAuth={showRequestAuth}
                setShowRequestAuth={setShowRequestAuth}
                responseFunc={() => {
                    setShowRequestAuth(false);
                }}
            />

            <AuthoriseTime 
                timegridID={props.timegrid.id} 
                showAuth={showAuth}
                setShowAuth={setShowAuth}
                responseFunc={(response: any) => {
                    const newSignature: TimegridAuthorisationSignatureResponseData = response.data;
                    props.setTimegridAuthorisationData(prevState => [...prevState, newSignature]);
                    setShowAuth(false);
                }}
            />
            
            <ValidateTimegrid 
                timegridID={props.timegrid.id} 
                showValidate={showValidate}
                setShowValidate={setShowValidate}
                noOfTickets={props.noOfTickets}
                responseFunc={(response: any) => {
                    const updatedTimegridData: TimegridResponseData = response.data;
                    props.setTimegridData(updatedTimegridData);
                    setShowValidate(false);
                }} 
            />
            
            <ReturnToEngineer 
                timegridID={props.timegrid.id}
                showReturn={showReturn}
                setShowReturn={setShowReturn}
                responseFunc={(response: any) => {
                    const updatedTimegridData: TimegridResponseData = response.data;
                    props.setTimegridData(updatedTimegridData);
                    setShowReturn(false);
                }} 
            />

            <AddTimegridNote
                show={showAddNote}
                hideFunc={() => setShowAddNote(false)}
                date={props.timegrid.data.date}
                userID={props.timegrid.data.user_id}
                resFunc={() => props.getTimegridNotes(props.timegrid.data.user_id, props.timegrid.data.date)}
            />

        </>
    )
}

export default TimegridActions