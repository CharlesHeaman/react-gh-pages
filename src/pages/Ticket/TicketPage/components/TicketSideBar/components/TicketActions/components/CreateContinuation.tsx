import { ChangeEvent, useState } from "react";
import SubmitButton from "../../../../../../../../components/form/SubmitButton/SubmitButton";
import WindowOverlay from "../../../../../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import { CreateTicketAttributes } from "../../../../../../../../types/tickets.types";
import postAPI from "../../../../../../../../utils/postAPI";
import updateStateCheckboxParams from "../../../../../../../../utils/updateStateParams/updateStateCheckboxParams";
import updateStateParams from "../../../../../../../../utils/updateStateParams/updateStateParams";
import TicketTicketDetailsForm from "../../../../../../CreateTicketPage/TicketTicketDetailsForm";
import isTicketDetailsFormValid from "../../../../../../CreateTicketPage/utils/isTicketDetailsFormValid";

const CreateContinuation = (props: {
    ticketID: number,
    ticketType: number,
    show: boolean,
    hideFunc: () => void,
}) => {
    const [submitting, setSubmitting] = useState(false);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [ticketDetails, setTicketDetails] = useState<CreateTicketAttributes>({
            job_description: '',
            estimated_time: '0',
            is_mate_required: false,
            is_rams_required: false,
        });

    // const updateDateParams = (date: Date, name: string) => {
    //     updateStateDateParams(date, name, setAssignEngineerAttributes)
    // }

    const formComplete = isTicketDetailsFormValid(ticketDetails);

    const assignEngineer = () => {
        setHasSubmitted(true);
        if (!formComplete) return;
        postAPI(`tickets/${props.ticketType}/${props.ticketID}/create_continuation`, {}, {
            ...ticketDetails,
        }, () => {
            props.hideFunc();
            setHasSubmitted(false)
        }, setSubmitting)
    }

    const updateTicketParams = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => {
        updateStateParams(event, setTicketDetails);
    }

    const updateTicketCheckboxParams = (event: ChangeEvent<HTMLInputElement>) => {
        updateStateCheckboxParams(event, setTicketDetails);
    }
    
    return (
        <WindowOverlay 
            title={`Create ${props.ticketType === 0 ? 'Continuation' : 'Sub-ticket'}`}
            maxWidth={600}
            show={props.show}
            hideFunc={props.hideFunc}
            footer={<SubmitButton
                text={`Create ${props.ticketType === 0 ? 'Continuation' : 'Sub-ticket'}`}
                clickFunc={assignEngineer}
                submitting={submitting}
                submittingText="Creating..."
                iconFont={props.ticketType === 0 ? 'local_activity' : 'confirmation_number'}
                disabled={hasSubmitted && !formComplete}
            />}
        >
            <TicketTicketDetailsForm 
                ticketDetails={ticketDetails} 
                updateParams={updateTicketParams} 
                updateCheckboxParams={updateTicketCheckboxParams}
                showErrors={hasSubmitted}   
            />
        </WindowOverlay>
    )
}

export default CreateContinuation