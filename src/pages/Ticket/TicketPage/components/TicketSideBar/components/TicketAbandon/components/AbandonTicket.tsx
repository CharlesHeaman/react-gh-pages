import { Dispatch, SetStateAction, useState } from "react"
import SubmitButton from "../../../../../../../../components/form/SubmitButton/SubmitButton"
import WindowOverlay from "../../../../../../../../components/ui/Containers/WindowOverlay/WindowOverlay"
import { TicketResponseData } from "../../../../../../../../types/tickets.types";
import putAPI from "../../../../../../../../utils/putAPI";

const AbandonTicket = (props: {
    ticketID: number,
    ticketType: number,
    setTicketData: Dispatch<SetStateAction<TicketResponseData | undefined>>
    show: boolean,
    hideFunc: () => void,
}) => {
    const [submitting, setSubmitting] = useState(false);

    const abandonTicket = () => {
        putAPI(`tickets/${props.ticketType}/${props.ticketID}/abandon_ticket`, {}, {}, (response: any) => {
            const ticketData = response.data;
            props.setTicketData(ticketData);
        }, setSubmitting)
    }

    return (
        <WindowOverlay 
            title='Abandon Ticket'
            maxWidth={300} 
            show={props.show}
            hideFunc={props.hideFunc} 
        >
            <p>Are you sure you want to abandon this ticket?</p>
            <SubmitButton 
                text='Abandon Ticket'
                color='red'
                iconFont='delete'
                submitting={submitting}
                submittingText='Deleting...'
                clickFunc={abandonTicket}            
            /> 
        </WindowOverlay>
    )
}

export default AbandonTicket