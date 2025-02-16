import { Dispatch, SetStateAction, useState } from "react";
import SubmitButton from "../../../../../../../../components/form/SubmitButton/SubmitButton";
import WindowOverlay from "../../../../../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import { TicketResponseData } from "../../../../../../../../types/tickets.types";
import putAPI from "../../../../../../../../utils/putAPI";
import isCompleteTicketFormComplete from "../utils/isCompleteTicketFormComplete";
import CompleteTicketForm from "./CompleteTicketForm";

const CompleteTicket = (props: {
    ticketID: number,
    ticketType: number,
    show: boolean,
    hideFunc: () => void,
    engineerReport: string,
    setTicketData: Dispatch<SetStateAction<TicketResponseData | undefined>>
}) => {
    // Form States
    const [submitting, setSubmitting] = useState(false);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [completionDate, setCompletionDate] = useState<Date>(new Date());
    const [report, setReport] = useState<string>(props.engineerReport);
    const [awaitingCosts, setAwaitingCosts] = useState<boolean>(false);
    const [workRequired, setWorkRequired] = useState<boolean>(false);

    const formComplete = isCompleteTicketFormComplete(report);

    const completeTicket = () => {
        setHasSubmitted(true);
        if (!formComplete) return;
        putAPI(`tickets/${props.ticketType}/${props.ticketID}/complete_ticket`, {}, {
            completion_date: completionDate,
            customer_viewable_report: report,
            is_ready_for_invoicing: !awaitingCosts,
            is_further_work_required: workRequired
        }, (response: any) => {
            const ticketData = response.data;
            props.setTicketData(ticketData);
        }, setSubmitting)
    }
    
    return (
        <WindowOverlay 
            title={"Complete Ticket"} 
            maxWidth={400} 
            show={props.show}
            hideFunc={props.hideFunc}
            footer={<SubmitButton
                text="Complete Ticket"
                iconFont="check_circle"
                submitting={submitting}
                color="dark-blue"
                clickFunc={completeTicket}
            />} 
        >
            <CompleteTicketForm
                completionDate={completionDate}
                setCompletionDate={setCompletionDate}
                report={report}
                setReport={setReport}
                awaitingCosts={awaitingCosts}
                setAwaitingCosts={setAwaitingCosts}
                workRequired={workRequired}
                setWorkRequired={setWorkRequired}
                hasSubmitted={hasSubmitted}
            />   
        </WindowOverlay>
    )
}

export default CompleteTicket