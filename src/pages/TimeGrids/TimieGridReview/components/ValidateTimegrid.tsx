import { Dispatch, SetStateAction, useState } from "react";
import SubmitButton from "../../../../components/form/SubmitButton/SubmitButton";
import WindowOverlay from "../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import putAPI from "../../../../utils/putAPI";

function ValidateTimegrid(props: {
    showValidate: boolean,
    setShowValidate: Dispatch<SetStateAction<boolean>>
    timegridID: number,
    noOfTickets: number,
    responseFunc: (response: any) => void
}) {
    const [submitting, setSubmitting] = useState(false);

    const validateTimegrid = () => {
        props.noOfTickets > 0 ?
            putAPI(`timegrids/${props.timegridID}/validate`, {}, {}, props.responseFunc, setSubmitting) :
            putAPI(`timegrids/${props.timegridID}/process`, {}, {
                invoice_ticket_time: []
            }, props.responseFunc, setSubmitting)  
    }

    return (
        <WindowOverlay
            title='Validate Timegrid'
            show={props.showValidate} 
            maxWidth={300} 
            hideFunc={() => props.setShowValidate(false)}
            footer={<SubmitButton 
                text='Validate Timegrid' 
                color='purple' 
                submitting={submitting} 
                submittingText="Validating..." 
                clickFunc={validateTimegrid}
                iconFont="verified"
            />}
        >
            <p>Validate engineer timegrid? This will lock the timegrid from any further changes.</p>
        </WindowOverlay>
    )
}

export default ValidateTimegrid