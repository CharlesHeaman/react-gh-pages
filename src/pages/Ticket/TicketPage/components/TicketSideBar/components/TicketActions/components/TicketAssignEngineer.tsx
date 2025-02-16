import { Dispatch, SetStateAction, useState } from "react";
import SubmitButton from "../../../../../../../../components/form/SubmitButton/SubmitButton";
import WindowOverlay from "../../../../../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import { AssignTicketAttributes, TicketResponseData } from "../../../../../../../../types/tickets.types";
import { UserResponseData } from "../../../../../../../../types/user.types";
import putAPI from "../../../../../../../../utils/putAPI";
import updateStateDateParams from "../../../../../../../../utils/updateStateParams/updateStateDateParams";
import TicketAssignForm from "./TicketAssignForm";

const TicketAssignEngineer = (props: {
    ticketID: number,
    ticketType: number,
    engineers: Array<UserResponseData>,
    show: boolean,
    hideFunc: () => void,
    currentVisitDate: Date | null,
    setTicketData: Dispatch<SetStateAction<TicketResponseData | undefined>>
}) => {
    const [submitting, setSubmitting] = useState(false);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [assignEngineerAttributes, setAssignEngineerAttributes] = useState<AssignTicketAttributes>({
        visit_date: props.currentVisitDate ? new Date(props.currentVisitDate) : new Date()
    });
    const [selectedEngineer1, setSelectedEngineer1] = useState<UserResponseData | undefined>(props.engineers.length > 0 ? props.engineers[0] : undefined);
    const [selectedEngineer2, setSelectedEngineer2] = useState<UserResponseData | undefined>(props.engineers.length > 1 ? props.engineers[1] : undefined);
    const [selectedEngineer3, setSelectedEngineer3] = useState<UserResponseData | undefined>(props.engineers.length > 2 ? props.engineers[2] : undefined);
    const [selectedEngineer4, setSelectedEngineer4] = useState<UserResponseData | undefined>(props.engineers.length > 3 ? props.engineers[3] : undefined);

    const updateDateParams = (date: Date, name: string) => {
        updateStateDateParams(date, name, setAssignEngineerAttributes)
    }

    const formComplete = (
        selectedEngineer1?.id !== undefined
    );

    const assignEngineer = () => {
        setHasSubmitted(true);
        if (!formComplete) return;
        putAPI(`tickets/${props.ticketType}/${props.ticketID}/assign`, {}, {
            ...assignEngineerAttributes,
            engineer_ids: [selectedEngineer1?.id, selectedEngineer2?.id, selectedEngineer3?.id, selectedEngineer4?.id]
        }, (response: any) => {
            props.setTicketData(response.data);
            props.hideFunc();
            setHasSubmitted(false)
        }, setSubmitting)
    }
    
    return (
        <WindowOverlay 
            title="Assign Ticket"
            maxWidth={300}
            show={props.show}
            hideFunc={props.hideFunc}
            footer={<SubmitButton
                text="Assign Ticket"
                clickFunc={assignEngineer}
                submitting={submitting}
                submittingText="Assigning..."
                iconFont="assignment_ind"
                disabled={hasSubmitted && !formComplete}
            />}
        >
            <TicketAssignForm 
                assignEngineerAttributes={assignEngineerAttributes} 
                selectedEngineer1={selectedEngineer1}
                setSelectedEngineer1={setSelectedEngineer1}
                selectedEngineer2={selectedEngineer2}
                setSelectedEngineer2={setSelectedEngineer2}
                selectedEngineer3={selectedEngineer3}
                setSelectedEngineer3={setSelectedEngineer3}
                selectedEngineer4={selectedEngineer4}
                setSelectedEngineer4={setSelectedEngineer4}
                updateDateParams={updateDateParams} 
                showErrors={hasSubmitted}            
            />
        </WindowOverlay>
    )
}

export default TicketAssignEngineer